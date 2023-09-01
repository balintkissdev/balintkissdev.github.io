import React from "react";

export default class Badge extends React.Component {
  static makeBadges(items) {
    const badges = items.map((i) => {
      return <Badge>{i}</Badge>;
    });
    return badges;
  }

  render() {
    return (
      <span
        className="inline-block m-1 px-2 py-1 bg-[rgb(122,113,113)] rounded-xl
        text-[whitesmoke] font-bold"
        style={this.props.style}
      >
        {this.props.children}
      </span>
    );
  }
}
