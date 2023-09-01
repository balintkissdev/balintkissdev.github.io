import ResumeSection from "./ResumeSection";

import * as React from "react";

export default function AchievementsSection() {
  return (
    <ResumeSection id="achievements" title="Academic achievements">
      <div className="flex flex-col sm:grid grid-cols-12 gap-4">
        <div className="col-span-3 font-bold">Publications</div>
        <ul className="mx-4 sm:mx-auto col-span-9 list-disc">
          <li>
            Zoltán Pödör, Bálint Kiss, György Csóka, László Jereb
            <br />
            Possible climatic correlation of individual great buttefly species
            catch data – examinal methodology and preliminary results <br />
            University of West Hungary, Faculty of Forestry, Faculty Scientific
            Conference
            <br />
            Sopron, Hungary, 10 December 2013
          </li>

          <li>
            Zoltán Pödör, György Csóka, Bálint Kiss
            <br />
            Simple- and Multivariate data analysis of light trap catching data
            by a systematic window procedure
            <br />
            Decision Support System Workshop and ForestDSS Community of Practice
            <br />
            Lisbon, Portugal, 4-6 December 2013
          </li>
        </ul>

        <div className="col-span-3 font-bold">Conference presentations</div>
        <ul className="mx-4 sm:mx-auto col-span-9 list-disc">
          <li>
            Development of data analytic system for forest data in RapidMiner
            and R environment
            <br />
            XXXII. National Conference of Scientific Students Associations
            (OTDK)
            <br />
            Szeged, Hungary, 16-18 April 2015
          </li>

          <li>
            Development of CReMIT-based data analytic method for processing of
            forestry time series data
            <br />
            HTE Infokom 2014, 19th HTE Infocommunication Networks and
            Applications Conference and Exhibition, Student section
            <br />
            Kecskemét, Hungary, 9 October 2014
          </li>

          <li>
            Development of data analytic system for forest data in RapidMiner
            and R environment
            <br />
            University of West Hungary, Simonyi Károly Faculty of Engineering,
            Wood Sciences and Applied Arts, Faculty Conference of Scientific
            Students Associations (TDK)
            <br />
            Sopron, Hungary, 24 April 2014
          </li>
        </ul>

        <div className="col-span-3 font-bold">Research projects</div>
        <div className="col-span-9">
          <p>
            25294/207 TÁMOP-4.2.2.C-11/1/KONV-2012-0015 „Scientific processing
            of Earth-system data and socialization of knowledge with the help of
            modern IT resources
          </p>
        </div>

        <div className="col-span-3 font-bold">Awards, honors</div>
        <div className="col-span-9">
          <p>
            Earned II. place for presented research paper at University of West
            Hungary Faculty Conference of Scientific Students Associations (TDK)
          </p>
        </div>

        <div className="col-span-3 font-bold">Memberships</div>
        <div className="col-span-9">
          Richter Réz Géza College for Advanced Studies (2013 - 2015)
        </div>
      </div>
    </ResumeSection>
  );
}
