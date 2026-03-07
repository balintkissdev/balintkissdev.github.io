---
layout: ../../layouts/PostLayout.astro
title: "Adding \"defer\" keyword to C++"
published: 2025-01-13
updated: 2025-01-15
summary: "\"defer\" is a control flow mechanism in both Go and Zig that automate resource cleanup function calls and simplifies writing error handling code. When I found out that I can have the same feature in C++11 using macros and RAII for my 3D renderer project, I couldn't contain myself and wanted to share it."
---

**Disclaimer:** I am not the inventor of this magic but merely a user of it as part of my toolbox. Other people
already wrote about this, including

- [Ignacio Castaño - scope(exit) in C++11](http://the-witness.net/news/2012/11/scopeexit-in-c11/)
- [gingerBill - A Defer Statement For C++11](https://www.gingerbill.org/article/2015/08/19/defer-in-cpp/)
- [Oded Lazar - Implemeting Go's defer keyword in C++](https://oded.dev/2017/10/05/go-defer-in-cpp/)

If you are only interested in using this in your project, then TL;DR just copy-paste this:

```cpp
/// RAII wrapper for callable statements invoked by DEFER()
template <typename Callable>
struct ScopedDefer
{
    ScopedDefer(Callable f)
        : f(f)
    {
    }

    ~ScopedDefer()
    {
        f();
    }

    Callable f;
};

/// A common macro for string concatenation during preprocessing phase.
#define STR_CONCAT(a, b) _STR_CONCAT(a, b)
#define _STR_CONCAT(a, b) a##b

/// Implementation of "defer" keyword similar in Go and Zig to automatically
/// call resource cleanup at end of function scope without copy-pasted cleanup
/// statements or separate RAII wrapper data types.
#define DEFER(x) \
    const auto STR_CONCAT(tmpDeferVarName, __LINE__) = ScopedDefer([&]() { x; })
```

Otherwise I hope the following further breakdown showing a real-life example that I ran
into and a bonus look at the generated disassembly gives additional insight for
people that are fans of C++ like me.

## We've all been there before

So you want to diligently clean up your allocated resources to avoid leaking
both in the error case and the happy path? Who wouldn't? I can relate. I ran into this
multiple times, yet a particular case is when I wanted to use a native Win32
API window and WGL to create my OpenGL context for [my own 3D rendering
engine](https://github.com/balintkissdev/3d-renderer-cpp). The process is
documented [on the Khronos
wiki](https://www.khronos.org/opengl/wiki/Creating_an_OpenGL_Context_(WGL)),
which sounds confusing at first read, but the thing you have to know is

> In order to create a native Windows OpenGL context with WGL, you need to
> first create an empty temporary Win32 window that doesn't show anything and
> a temporary OpenGL context that doesn't do anything.

This is also called "fake context" or "helper context". It's an actual Catch-22
situation where "you need to have an OpenGL context before you can have an
OpenGL context". Even the documentation of the
[gl46](https://docs.rs/gl46/latest/gl46/#gl_get_proc_address) Rust crate is
commenting on it as

> "That sounds silly, but it's true."

The reason is due to how OpenGL drivers themselves behave on Windows with
legacy OpenGL 1.1 function addresses being available in `opengl32.dll`, while
the modern functionality is provided by the NVidia/AMD/Intel driver DLL files.
This rabbit hole goes deeper, but it is interesting to me and it warrants a
future blog post on this site.

Let's start cooking then. First some shoddy error handling without any cleanup:

```cpp
HWDN fakeWindow = CreateWindow(/* ... */);
HDC fakeDeviceContext = GetDC(fakeWindow);

HGLRC fakeRenderingContext = wglCreateContext(fakeDeviceContext);
if (!fakeRenderingContext)
{
    return false;
}

// ... Do work

return true;
```

Now add the cleanup code. Notice that `wglDeleteContext` is new at the end.

```cpp
HWDN fakeWindow = CreateWindow(/* ... */);
HDC fakeDeviceContext = GetDC(fakeWindow);

HGLRC fakeRenderingContext = wglCreateContext(fakeDeviceContext);
if (!fakeRenderingContext)
{
    // Cleanup in error case
    ReleaseDC(fakeWindow, fakeDeviceContext);
    DestroyWindow(fakeWindow);
    return false;
}

// ... Do work

// Cleanup at end of happy path
wglDeleteContext(fakeRenderingContext); // This was not in the first error path
ReleaseDC(fakeWindow, fakeDeviceContext);
DestroyWindow(fakeWindow);

return true;
```

The copy-paste becomes evident. And with the amount of failure points
increasing, this copy-pasting can absolutely get out of hand after a while.
Imagine forgetting to modify the cleanup code in any of the error paths and
introducing a resource leak.

```cpp
if (!fakeRenderingContext)
{
    // First cleanup in error case 1
    ReleaseDC(fakeWindow, fakeDeviceContext);
    DestroyWindow(fakeWindow);
    return false;
}

if (!wglMakeCurrent(fakeDeviceContext, fakeRenderingContext))
{
    // Copy-paste in error case 2
    wglDeleteContext(fakeRenderingContext);  // First appearance of rendering contect cleanup
    ReleaseDC(fakeWindow, fakeDeviceContext);
    DestroyWindow(fakeWindow);
    return false;
}

if (!gladLoadWGL(fakeDeviceContext, reinterpret_cast<GLADloadfunc>(wglGetProcAddress)))
{
    // Copy-paste in error case 3
    wglDeleteContext(fakeRenderingContext);
    ReleaseDC(fakeWindow, fakeDeviceContext);
    DestroyWindow(fakeWindow);
    return false;
}

// Copy-paste in happy case
wglDeleteContext(fakeRenderingContext);
ReleaseDC(fakeWindow, fakeDeviceContext);
DestroyWindow(fakeWindow);

return true;
```

This is why C++ introduced the concept of [*Resource Acquisition Is
Initializaion*](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization),
otherwise known as the *RAII* principle. The naming is a misnomer though (from
my view), as this is more related to handling de-initialization instead. I
never memorize the textbook definition despite me being the resident C++
language lawyer, but in the most basic layman terms, RAII just boils down to

> Write resource cleanup code in the destructor of class and the destructor automatically
gets called for you when the object goes of scope and its lifetime stops.

This is how C++11's `std::unique_ptr` RAII smart pointer class works for example. The actual
call to the `deleter` is done automatically on destructor call. Some people mistake that
RAII is only applicable to dynamic heap memory managed with `new/delete/malloc/free`, but the emphasis is on the *"Resource"* part. Anything can be treated as a resource from file handles to network sockets (Okay, if you
are on UNIX, sockets are just file handles too. But almost everything is treated as files in UNIX, just look in the `/dev` folder to see even your hardware being handled like files.). `std::lock_guard` for mutexes is a thing too.

Note that I am aware of criticisms of RAII online, how "it's bad program
design" and "it just makes programmers lazier to not free their own resources
themselves". RAII is just **an available tool** in **the toolbox**. Assess the
situation and use your judgement, use it when finding it appropriate, use
something else when that's needed instead. And for the "lazy" part: the RAII applier
still have to think in terms of lifetimes and ownership semantics to use it effectively.

## GOTO statements: The poor man's version of RAII in C

Without RAII, you would be out of luck here. You either stick with the manual copy-pasting
and hating life in the process. Or an alternative: you can choose to use an idiom found in C
codebases using `goto`s. This method is documented by [Eli Bendersky](https://eli.thegreenplace.net/2009/04/27/using-goto-for-error-handling-in-c) and [Max Vilimpoc](https://vilimpoc.org/research/raii-in-c/).

```cpp
bool ok = true; // Introduction of a success variable
if (!fakeRenderingContext)
{
    ok = false; // Don't forget to change it, or you are toast
    goto cleanup_my_fake_window;
}

if (!wglMakeCurrent(fakeDeviceContext, fakeRenderingContext))
{
    ok = false;
    goto cleanup_my_fake_rendering_context;
}

if (!gladLoadWGL(fakeDeviceContext, reinterpret_cast<GLADloadfunc>(wglGetProcAddress)))
{
    ok = false;
    goto cleanup_my_fake_rendering_context;
}

cleanup_my_fake_rendering_context:
    wglDeleteContext(fakeRenderingContext);
cleanup_my_fake_window:
    ReleaseDC(fakeWindow, fakeDeviceContext);
    DestroyWindow(fakeWindow);

return ok;
```

My objections:

- I am an advocate for the *Early-Return idiom* (also known as *Return Early
Pattern*). When I do a `return` in an `if`,  the control flow exits, I can more
easily follow my program mentally and not care how the function continues.
- When I worked on a codebase that used a single arbitrary success or result
variable that kept being updated throughout the duration of the whole function
body, the bugs came pouring in and it was annoying to find out they happened
because these variables were forgotten to be set.

Everybody learns early in software programming circles that "`goto` statements
are evil", it became a meme. But sometimes the odds are stacked against you and
knowing the rules and knowing how to break them is the choice (if you are
clueless though and break the rules without knowing how they work, you are just
going to fumble around). If I would write C, I can actually
imagine myself using this idiom. I had a hunch that even the Linux kernel code
relies on `goto`s, but no. What they have in place are called [*Scope-based
Cleanup Helpers*](https://docs.kernel.org/core-api/cleanup.html) to do
unwinding in LIFO order (Unwinding? LIFO? Now this is what I call foreshadowing
for later sections of this post).

Okay, I was not fully honest and hid this information from you: current GCC and Clang C compilers
have
[`__attribute__(cleanup)`](https://gcc.gnu.org/onlinedocs/gcc/Common-Variable-Attributes.html#index-cleanup-variable-attribute)
that tracks a variable and runs a function when it goes out of scope. No MSVC
equivalent though, ~~aside from simulating it with `__try` and `__finally` C
language extensions~~.

***UPDATE (2025-01-15):*** Check out [Implementing smart pointers for the C
programming language by Snaipe](https://snai.pe/posts/c-smart-pointers) and
[Comparing GCC C cleanup attribute with C++ RAII by Jussi
Pakkanen](https://nibblestew.blogspot.com/2016/07/comparing-gcc-c-cleanup-attribute-with.html)
as additional good reads in the `__attribute(cleanup)__` topic. As I
researched this, I was incorrect and there's no way to use MSVC's `__try` and
`__finally` for RAII and defer mechanism. I have a C side project
that I am working on where I wanted to try implementing my own `defer`, but
didn't want to sacrifice portability, so it was not worth the effort for me.
When looking for existing
solutions, I found [Defer](https://github.com/moon-chilled/Defer) GitHub
project by [moon-chilled](https://github.com/moon-chilled) which operates on
`setjmp` and `longjmp` to make `defer` work with MSVC's C compiler. It
introduces performance overhead as opposed to GCC or Clang, and there's a limit
of 32 deferred statements by default (which is plenty).

## Naively using RAII won't work

Let's start applying the RAII principle to write wrappers to the Win32 and WGL
resource types and see why we immediately regret this decision.

```cpp
struct WindowHandle
{
    ~WindowHandle()
    {
        if (hWnd != nullptr)
            DestroyWindow(hWnd);
    }

    HWND hWnd{nullptr};
};

struct DeviceContext
{
    ~DeviceContext()
    {
        if (hDC != nullptr)
            ReleaseDC(/* Wait, hWnd parameter is required here */, hDC);
    }

    HDC hDC{nullptr};
};

struct RenderingContext
{
    ~WGLContext()
    {
        if (rc != nullptr)
            wglDeleteContext(rc);
    }

    HGLRC rc{nullptr};
};

// ...

RenderingContext fakeRenderingContext.rc = wglCreateContext(fakeDeviceContext);
if (!fakeRenderingContext.rc)
{
    // Automatic resource release of WindowHandle going out of scope in error case
    return false;
}

// ..

// Automatic resource release of WindowHandle and RenderingContext going out of scope in error case
return true;
```

The moment we start having more and more resource types, writing wrappers for
them won't scale at all and becomes unsustainable. This further falls apart due
to `ReleaseDC` requiring both the window handle `HWND` and the device context
handle `HDC` as parameters at the same time.

Someone might bring up the question that why not just have these resources as a
collection of member variables owned by a class and write the cleanup in the
owning class destructor. These resources are temporary and I want to throw them
away immediately after the full OpenGL context finished initializing. It
doesn't fit my program design to contain them as class state during the
lifetime of an owning object.

## `std::unique_ptr` won't work

I still remember the first time I learned about the existence of
`std::unique_ptr` during my studies as a Computer Science student almost a
decade ago and even made my own `ScopedPtr` type as an exercise. I went so
overboard with RAII at the time that when I wrote an SDL graphics application,
I just wrapped everything I saw. Nowadays I would carefully plan out and
consider when it is appropriate to do something like this, but it was
interesting to me at the time.

```cpp
class SDLRenderer
{
public:

    // ...

private:
    struct SDLDeleter
    {
        void operator()(SDL_Window* window) { SDL_DestroyWindow(window); }
        void operator()(SDL_Renderer* render) { SDL_DestroyRenderer(render); }
        void operator()(SDL_Surface* surface) { SDL_FreeSurface(surface); }
        void operator()(SDL_Texture* texture) { SDL_DestroyTexture(texture); }
    };

    template <typename SDLType>
    using SDLPtr = std::unique_ptr<SDLType, SDLDeleter>;

    using SDLSurfacePtr = SDLPtr<SDL_Surface>;
    using SDLWindowPtr = SDLPtr<SDL_Window>;
    using SDLRendererPtr = SDLPtr<SDL_Renderer>;
    using SDLTexturePtr = SDLPtr<SDL_Texture>;

    SDLWindowPtr window_;
    SDLRendererPtr renderer_;
    SDLTexturePtr screenTexture_;
};

// Usage:
window_.reset(SDL_CreateWindow(
        "This is my fancy-schmancy window title",
        SDL_WINDOWPOS_UNDEFINED,
        SDL_WINDOWPOS_UNDEFINED,
        1920,
        1080,
        SDL_WINDOW_SHOWN));
```

Although different from my current situation, `SDLRenderer` is the owner of the
resources as member variables. Treating them as part of `SDLRenderer`'s state
and for them to exist in within the lifetime of the class makes sense in this
context. On the contrary as I mentioned earlier, my `fakeWindow`,
`fakeDeviceContext` and `fakeRenderingContext` are temporary resources and not
part of any class state. It would be still seem valid use cases, because
`std::unique_ptr` even operates and cleans up in the local scope and lifetime of a
function body.

What is stopping me from doing something this in my current WGL code?

```cpp
std::unique_ptr<HWND, HWNDDeleter> fakeWindow = std::make_unique<HWND>(/* ... */);
```

The wrapped SDL types in the former example are all raw/naked pointer types
like `SDL_Window*`, `SDL_Renderer*`, `SDL_Surface*` and `SDL_Texture*`. `HWND`,
`HDC` and `HGLRC` are not pointers, they are handles. Although
- no additional heap allocation is needed as `std::unique_ptr`s are not heap
resource managers but pointer managers
- `HANDLE` types often get `typedef`'d into `PVOID` pointer types in Win32 headers
 (okay, this goes further and is different when STRICT mode is enabled with `#define STRICT`)

this runs into a compiler error because `std::unique_ptr` requires a
*"pointed-to"* type like `SDL_Window*` and not pointer type itself like
`PVOID`. More specifically, it checks for the presence of `::pointer` type
on the `deleter` itself.

## `defer` to my rescue

Good thing that I am also a user of the Go programming language, exposing
myself to multiple paradigms and idioms. Go is not a strictly object-oriented
programming language. Technically [the official FAQ answer is a "yes and
no"](https://go.dev/doc/faq#Is_Go_an_object-oriented_language) and the langauge
just borrows concepts and the good parts of OOP like interfaces (multiple C++
inheritence and *Deadly Diamond Problem* anyone?). What they have in place of
RAII which would require a lifetime of an OOP object, is the `defer` mechanism.
This is a built-in language statement that pushes functions into a LIFO call
list and will be called at the time when control flow finishes.

```go
func CopyFile(dstName, srcName string) (written int64, err error) {
    src, err := os.Open(srcName)
    if err != nil {
        return
    }
    defer src.Close()

    dst, err := os.Create(dstName)
    if err != nil {
        // src.Close() called automatically here
        return
    }
    defer dst.Close()

    return io.Copy(dst, src)
    // dst.Close() and src.Close() called automatically at the end
}
```

It was so good in fact, that [it's also in
Zig](https://ziglang.org/documentation/master/#defer), along with an
[`errdefer` keyword](https://ziglang.org/documentation/master/#errdefer) that
executes the deferred call only when an error happened and not on the happy
path. Dlang has its own version with the [`scope(exit)`, `scope(success)` and
`scope(failure)` statements](https://tour.dlang.org/tour/en/gems/scope-guards)
(possibly earlier and predating Go, but I cannot confirm it for sure).

What would you say if I told you: you can have your cake and eat it?
With the power of preprocessor macros and just using a single hidden RAII
wrapper struct, you can have your own `defer` mechanism. And actually
wrap multiple statements inside!

```cpp
DEFER({
    ReleaseDC(fakeWindow, fakeDeviceContext);
    DestroyWindow(fakeWindow);
});
```

The heart of it is a struct that wraps in a callable type `Callable` type and uses RAII
to execute it in destruction.

```cpp
/// RAII wrapper for callable statements invoked by DEFER()
template <typename Callable>
struct ScopedDefer
{
    ScopedDefer(Callable f)
        : f(f)
    {
    }

    ~ScopedDefer()
    {
        f();
    }

    Callable f;
};
```

The client caller won't see the struct itself. Instantiation is done by
the `DEFER()` macro that accepts the statements as parameters and creates a
lambda out of them.

```cpp
/// A common macro for string concatenation during preprocessing phase.
#define STR_CONCAT(a, b) _STR_CONCAT(a, b)
#define _STR_CONCAT(a, b) a##b

/// Implementation of "defer" keyword similar in Go and Zig to automatically
/// call resource cleanup at end of function scope without copy-pasted cleanup
/// statements or separate RAII wrapper data types.
#define DEFER(x) \
    const auto STR_CONCAT(tmpDeferVarName, __LINE__) = ScopedDefer([&]() { x; })
```

A bogus temporary variable name needs to be concatenated from the source code
line number, so the preprocessor can expand code into something like this (I'm
paraphrasing here, use [C++ Insights](https://cppinsights.io) for exact
output):

```cpp
// Let's say .cpp line number is 331
const __lambda_12_3 tmpDeferVarName331 = ScopedDefer<__lambda_12_3>([&]() {
        ReleaseDC(fakeWindow, fakeDeviceContext);
        DestroyWindow(fakeWindow);
        ;
    })
```

Witness now as my WGL initialization code finally makes more sense now by
turning C++ into Go:

```cpp
// NEW!
DEFER({
    ReleaseDC(fakeWindow, fakeDeviceContext);
    DestroyWindow(fakeWindow);
});

HGLRC fakeRenderingContext = wglCreateContext(fakeDeviceContext);
if (!fakeRenderingContext)
{
    // ReleaseDC and DestoryWindow are called
    return false;
}
// NEW!
DEFER(wglDeleteContext(fakeRenderingContext));

if (!wglMakeCurrent(fakeDeviceContext, fakeRenderingContext))
{
    // wglDeleteContext, ReleaseDC and DestoryWindow are called
    return false;
}

if (!gladLoadWGL(fakeDeviceContext,
                 reinterpret_cast<GLADloadfunc>(wglGetProcAddress)))
{
    // wglDeleteContext, ReleaseDC and DestoryWindow are called
    return false;
}

// wglDeleteContext, ReleaseDC and DestoryWindow are called at the end

return true;
```

> -- Vincent! We happy?
>
> -- Yeah, we happy.

## As a bonus: looking at the generated disassembly

I was interested in comparing implementations of `ScopedDefer` either with
template or using `std::function`. That's why I used Matt Godbolt's Compiler Explorer to look
at the disassembly compiled using GCC 14.2 with `-O3` optimizations enabled. You can
check out my full experimentation [in this Compiler Explorer
link](https://godbolt.org/#z:OYLghAFBqd5QCxAYwPYBMCmBRdBLAF1QCcAaPECAMzwBtMA7AQwFtMQAHVWgTxZIB0yDh1JVUDAgGVkTeiACMAFjESCAVQDOmAAoAPEAHIADIdIArRaVpMGoZAFIATACFnL0h1uYAcq3ZYVJjEQiKk2vTIBHgSlIzoAMLcAK4sDCBOCqTxADJ4DL6pAEbBIADMZZ6omoQxDEm0qemZVTXREnkFPsWlFeGYke0MUgRMxAQNTRlZEZhRdSNjBJ2FLCXE5ZWao%2BOTadPhO8v5q%2BubAJThqMnEyOyGzmX5yI1YANQOZQnI2/ion9gHMYAIKPZ6vTAfL5UZIMeYSOQAoGgkGPQInN5SAAqACUAPoJADyPgSwKxECYpDeRXObzx2PxRJJZIpVJpyLRmBoBTpDIJxNJ5Mp1NpTEejyKHJBBEwLA4NhlUISBB4HEY/jeADEkSDtsRklFMWg1egACJc4IcgDsbhBb3tRtQJvNQWIEE1byo52RDt9bxAnuo3rtDocNp9oatpqlwN9AD8ZE7MGaLW7aWGXIHvWVM2Ho6iQ/aPVRPrbQVHSzHOdzIabsJrsDiIHp0wBWBIR%2B1oBjbN5MZJETG4/nM8kEOUu4IANTGfjYVLxeJyAEkfNhF%2BmyqbHc7UxAHK23E4AGwH00QdM2t56UsfKPBlHAgBuqDw6DeDFQk%2BIpuS6Av1plr6%2BQEAAVNeULbgUADubwgRAVrZkBDocMQIFUPuThOM4rboAeCQMM4ThUqBLaVoWbxYPQio3jm1r5o%2BL5vm8Mpygqybfr%2B/4PhmnZwZI4F6JBH6YLB8GIeRsYOnWDZNlRmA0UhfGoehmHYU4uH4YRWEkWRdGohWBbPq%2B76ft%2BAEGch9oqZIGFEZqeDENsWlEUpFE2QQdlYVIcwSHh7baU4bnlgxyJMe%2BrHykwMopq6FnllZbwyY2EAeV5Tg%2Bd2/kEa5wXKWhtlqQ5TkEC5WF5YZj56gaBA7smmqwlEJDfoBfGJiaDVwkQP57t2va/CAIAwl1dSfAk4UAWUgInp6D5%2Bg6AYYV6fG8RReYxvG7X1Y13XmZemYYUhd6hRRA1DTto1fBN2bYJ6knrfpj7VhimrqCSWKEviyVNi2HztnxfW1f2g58kygoQOOHDfjOxBzpgC5Lqu654pu25begnVNT1cUHkep6tue%2B3XreeY8SC4WejtzV7jx4YUa972fXi32pQVnlqZlfllUFeXuWz6XFc5AWufdUaGJctBGK2ZjpCYZioCAgTBKEogEEYpjnJcADWICtgoAgABytlaZRWlaChOAbVsAJwaSokuGEoZgsIoxjGKQsumKQCuGGYmggO7aty5ccCwEgaBynQwTkJQEccFHGzAMoxE0LQMpOZQRTq2YRT5GMPBGAoOd58QPCEkU5hzEHRekBHbCSISDC8NnpBYEUyTAAkci0P7hg11gLC2MA8hy63jlV3gT6YL3XuYHocwDvcNcgQMLe0HgRTEPnSRYC3BBoS7fdmFPxBFNUmDmoPdjr3Y2eXFQNjAJoU54KJhJqrLNfiJIMhyOwyiqEkFoXQBhR6WCyDYW%2BjhXDuGsBvf2kBLhOiGL3AAtISMobxUFUE/KguedwOAoPlifNCWAEEXn6IMOocQGCJBSPsLIuQTjdDWKULIXA2h1D2Okdh1RagdGYT0DYMwBgTwkIsXY9CeGULEcMI4KwWFnBmEcbhVhthLAUUIxQlxNDXFuP/CWUsZYtx9teA2x5UHHiUG8YAyBkBvGUAIJwbwIC4EICQD4TgygKHOGYIOGtLgIEwEwLAGwKE6yUAbAQydjxYQNubBQChjBWmPNYIwTtSAuySe7T28sjB%2BwDqQfx4tDGGCcMY0ePs/F30uCfGosQlBAA%3D).

I've chosen a dummy example. Apologies for the insertion of `printf` but I
needed to introduce some kind of arbitrary side effect because I kept fighting
the compiler who always optimized out my function bodies and inserted NOP
operations in their places. But I still had no luck and the compiler won.

```cpp
void noDefer()
{
    int* x = new int(7);
    printf("%d\n", *x);
    delete x;
}

void templatedDefer()
{
    int* x = new int(7);
    DEFER(delete x);
    printf("%d\n", *x);
}
```

```asm
.LC0:
        .string "%d\n"
noDefer():
        mov     esi, 7
        mov     edi, OFFSET FLAT:.LC0
        xor     eax, eax
        jmp     printf
templatedDefer():
        mov     esi, 7
        mov     edi, OFFSET FLAT:.LC0
        xor     eax, eax
        jmp     printf
```

Wow, this is a dud. I mean I'm impressed and applaud GCC, because it
just optimized out the whole heap allocation altogether. I always tell people
don't hand-optimize out something that modern compilers can do better, but this
is going the extra mile. Let's try it differently.

```cpp
void noDefer()
{
    printf("First\n");
    printf("Second\n");
}

void templatedDefer()
{
    DEFER(printf("Second\n"));

    printf("First\n");
}
```

```asm
.LC0:
        .string "Second"
.LC2:
        .string "First"
noDefer():
        sub     rsp, 8
        mov     edi, OFFSET FLAT:.LC2
        call    puts
        mov     edi, OFFSET FLAT:.LC0
        add     rsp, 8
        jmp     puts
templatedDefer():
        push    rbx
        mov     edi, OFFSET FLAT:.LC2
        call    puts
        mov     edi, OFFSET FLAT:.LC0
        call    puts
        pop     rbx
        ret
        mov     rbx, rax
        jmp     .L16
templatedDefer() [clone .cold]:
.L16:
        mov     edi, OFFSET FLAT:.LC0
        call    puts
        mov     rdi, rbx
        call    _Unwind_Resume
```

I expected the defer to be inlined, and the manual cleanup and defer disassembly to
be identical. What's going on? We need to talk about exception handling in C++.

## My thoughts on exception handling

If someone asks me, I am not a fan. My personal coding conventions don't include
it and I even go as far as to disable exception handling with the
`-fno-exceptions` compiler flag in my own projects. My disassembly got
littered with exception stack unwinding instructions
as if my program expects that my code will `throw`, even though I never used
a single `try-catch` anywhere.

```asm
templatedDefer():
        push    rbx     # RBX is saved for use in exception handling

        mov     edi, OFFSET FLAT:.LC2
        call    puts
        mov     edi, OFFSET FLAT:.LC0
        call    puts

        pop     rbx     # RBX is restored here

        ret

        # This part is a jump to exception handler
        mov     rbx, rax
        jmp     .L16

# Cold section, separated from main "hot" execution path to help CPU's branch
# predictor
templatedDefer() [clone .cold]:
.L16:
        mov     edi, OFFSET FLAT:.LC0
        call    puts
        mov     rdi, rbx
        call    _Unwind_Resume
```

In fact, when I add `-fno-exceptions` to the flags in Compiler Explorer, I finally
get the outcome that I wanted: the manual and defer disassembly are identical,
and the defer got inlined:

```asm
.LC0:
        .string "Second"
.LC2:
        .string "First"
noDefer():
        sub     rsp, 8
        mov     edi, OFFSET FLAT:.LC2
        call    puts
        mov     edi, OFFSET FLAT:.LC0
        add     rsp, 8
        jmp     puts
templatedDefer():
        sub     rsp, 8
        mov     edi, OFFSET FLAT:.LC2
        call    puts
        mov     edi, OFFSET FLAT:.LC0
        add     rsp, 8
        jmp     puts
```

I used to work on projects in the real-time embedded systems domain and the
performance cost introduced by stack unwinding was simply not acceptable there.
All hail Zig for allowing `try-catch`-based error handling that doesn't do
stack unwinding in Release builds. I tried workarounds using `noexcept` in code
itself without the need to provide `-fno-exceptions`, but I was not successful
and gave up. But there's a high chance that maybe I am just over-obsessing over
a couple CPU instructions that are just peanuts compared to the grand scheme of
things. I still wanted my identical inlined `DEFER` though!

Exception handling has the chance to enable bad error handling practices where
the programmer uses "catch all" but doesn't handle the catched error and
instead passes and propagates the exception further in the function call chain.
I saw that happen with my own eyes, although it was in Java codebase and not
C++. There's an additional know-how required how to write code in the style of
*Exception-Safe C++*.

That said if the conventions of an existing project
already relies on exception-based error handling, then I adhere to
those. Other than that, I prefer using `std::optional` instead, similar to how
I am happy for Go's `error` interface and `Optional`/`Result` types in Rust.

## So what's wrong with using `std::function`?

Finally after a diversion, back to what I wanted to show. You would be tempted
to use `std::function` inside `ScopedDefer` instead of templates because it
just sounds so logical. "It's a type-safe alternative to C function pointers,
why wouldn't I choose this"? But as [Ignacio Castaño mentioned in his
article](http://the-witness.net/news/2012/11/scopeexit-in-c11/), it is not
advisable because of the extra unnecessary instructions that are generated by
the compiler. Everything and the kitchen sink gets generated here.

```cpp
struct ScopedFunctorDefer
{
    ScopedFunctorDefer(const std::function<void()>& f)
        : f(f)
    {
    }

    ~ScopedFunctorDefer() { f(); }

    std::function<void()> f;
};

#define FUNCTOR_DEFER(x) \
    const auto STR_CONCAT(tmpDeferVarName, __LINE__) = ScopedFunctorDefer([&]() { x; })

void functorDefer()
{
    FUNCTOR_DEFER(printf("Second\n"));

    printf("First\n");
}
```

```asm
.LC0:
        .string "Second"
.LC2:
        .string "First"
std::_Function_handler<void (), functorDefer()::{lambda()#1}>::_M_invoke(std::_Any_data const&):
        mov     edi, OFFSET FLAT:.LC0
        jmp     puts

functorDefer():
        push    rbx
        pxor    xmm0, xmm0
        mov     edi, OFFSET FLAT:.LC2
        sub     rsp, 32
        movaps  XMMWORD PTR [rsp], xmm0
        movq    xmm0, QWORD PTR .LC3[rip]
        movhps  xmm0, QWORD PTR .LC4[rip]
        movaps  XMMWORD PTR [rsp+16], xmm0
        call    puts
        cmp     QWORD PTR [rsp+16], 0
        je      .L19
        mov     rdi, rsp
        call    [QWORD PTR [rsp+24]]
        mov     rax, QWORD PTR [rsp+16]
        test    rax, rax
        je      .L13
        mov     edx, 3
        mov     rsi, rsp
        mov     rdi, rsp
        call    rax
.L13:
        add     rsp, 32
        pop     rbx
        ret
functorDefer() [clone .cold]:
typeinfo for functorDefer()::{lambda()#1}:
        .quad   vtable for __cxxabiv1::__class_type_info+16
        .quad   typeinfo name for functorDefer()::{lambda()#1}
typeinfo name for functorDefer()::{lambda()#1}:
        .string "*Z12functorDefervEUlvE_"
.LC3:
        .quad   std::_Function_handler<void (), functorDefer()::{lambda()#1}>::_M_manager(std::_Any_data&, std::_Any_data const&, std::_Manager_operation)
.LC4:
        .quad   std::_Function_handler<void (), functorDefer()::{lambda()#1}>::_M_invoke(std::_Any_data const&)
```

Remember, the data types of
`std::function` and lambdas are not the same. You can see it for yourself
enabling RTTI and printing out the `typeid`s. Not even that is necessary with
the use of C++ Insights to check the C++ code generation instead ([link to full
sample](https://cppinsights.io/lnk?code=I2luY2x1ZGUgPGNzdGRpbz4KI2luY2x1ZGUgPGZ1bmN0aW9uYWw+CgojZGVmaW5lIFNUUl9DT05DQVQoYSwgYikgX1NUUl9DT05DQVQoYSwgYikKI2RlZmluZSBfU1RSX0NPTkNBVChhLCBiKSBhIyNiCgp0ZW1wbGF0ZSA8dHlwZW5hbWUgRj4Kc3RydWN0IFNjb3BlZERlZmVyCnsKICAgIFNjb3BlZERlZmVyKEYgZikKICAgICAgICA6IGYoZikKICAgIHsKICAgIH0KCiAgICB+U2NvcGVkRGVmZXIoKSB7IGYoKTsgfQoKICAgIEYgZjsKfTsKCiNkZWZpbmUgREVGRVIoeCkgXAogICAgY29uc3QgYXV0byBTVFJfQ09OQ0FUKHRtcERlZmVyVmFyTmFtZSwgX19MSU5FX18pID0gU2NvcGVkRGVmZXIoWyZdKCkgeyB4OyB9KQoKdm9pZCBub0RlZmVyRHVkKCkKewogICAgaW50KiB4ID0gbmV3IGludCg3KTsKICAgIHByaW50ZigiJWRcbiIsICp4KTsKICAgIGRlbGV0ZSB4Owp9Cgp2b2lkIHRlbXBsYXRlZERlZmVyRHVkKCkKewogICAgaW50KiB4ID0gbmV3IGludCg3KTsKICAgIHByaW50ZigiJWRcbiIsICp4KTsKICAgIERFRkVSKGRlbGV0ZSB4KTsKfQoKdm9pZCBub0RlZmVyKCkKewogICAgcHJpbnRmKCJGaXJzdFxuIik7CiAgICBwcmludGYoIlNlY29uZFxuIik7Cn0KCnZvaWQgdGVtcGxhdGVkRGVmZXIoKQp7CiAgICBERUZFUihwcmludGYoIlNlY29uZFxuIikpOwoKICAgIHByaW50ZigiRmlyc3RcbiIpOwp9CgpzdHJ1Y3QgU2NvcGVkRnVuY3RvckRlZmVyCnsKICAgIFNjb3BlZEZ1bmN0b3JEZWZlcihjb25zdCBzdGQ6OmZ1bmN0aW9uPHZvaWQoKT4mIGYpCiAgICAgICAgOiBmKGYpCiAgICB7CiAgICB9CgogICAgflNjb3BlZEZ1bmN0b3JEZWZlcigpIHsgZigpOyB9CgogICAgc3RkOjpmdW5jdGlvbjx2b2lkKCk+IGY7Cn07CgojZGVmaW5lIEZVTkNUT1JfREVGRVIoeCkgXAogICAgY29uc3QgYXV0byBTVFJfQ09OQ0FUKHRtcERlZmVyVmFyTmFtZSwgX19MSU5FX18pID0gU2NvcGVkRnVuY3RvckRlZmVyKFsmXSgpIHsgeDsgfSkKCnZvaWQgZnVuY3RvckRlZmVyKCkKewogICAgRlVOQ1RPUl9ERUZFUihwcmludGYoIlNlY29uZFxuIikpOwoKICAgIHByaW50ZigiRmlyc3RcbiIpOwp9&std=cpp2a&rev=1.0)):

```cpp
template<>
struct ScopedDefer<__lambda_34_5>
{
  inline ScopedDefer(__lambda_34_5 f)
  : f{__lambda_34_5(f)}
  {
  }

  inline ~ScopedDefer() noexcept
  {
    this->f.operator()();
  }

  __lambda_34_5 f;
  // inline ScopedDefer<__lambda_34_5> & operator=(const ScopedDefer<__lambda_34_5> &) /* noexcept */ = delete;
};

struct ScopedFunctorDefer
{
  inline ScopedFunctorDefer(const std::function<void ()> & f)
  : f{std::function<void ()>(f)}
  {
  }

  inline ~ScopedFunctorDefer() noexcept
  {
    this->f.operator()();
  }

  std::function<void ()> f;
};

// The std::function version now has to convert the lambda
const ScopedFunctorDefer tmpDeferVarName56 = ScopedFunctorDefer(ScopedFunctorDefer(std::function<void ()>(__lambda_56_5{x})));
```

Phew, that's all for now, I didn't know in advance that I'm going to do a deep
dive like this. If there's one thing that you should get out of this, is that
don't apply `std::function` blindly everywhere. And implementing `defer` in C
using `__attribute(cleanup)__` will be left as homework to you.

