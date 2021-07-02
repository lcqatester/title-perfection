import { pathOr } from "ramda";
import Card from "./card";
import { validatedTitlePerfectionByState } from "./utils";
import titlePerfectionByState from "../title-perfection.json";
export default function StateRequirments({ stateAb, states }) {
  validatedTitlePerfectionByState(titlePerfectionByState);
  const titlePerfectionTransferDetails = titlePerfectionByState[stateAb];
  const documents = pathOr(
    null,
    ["Requirements", "Documents"],
    titlePerfectionTransferDetails
  );
  const stateFee = pathOr(null, ["StateFee"], titlePerfectionTransferDetails);
  const sectionsToBeCompleted = pathOr(
    null,
    ["SectionsToBeCompleted"],
    titlePerfectionTransferDetails
  );
  const dmvAddress = pathOr(
    null,
    ["DMVAddress"],
    titlePerfectionTransferDetails
  );

  const getSectionContent = (data, listType = "TYPE_NONE", level = 1) => {
    if (typeof data === "string") {
      return <div>{data}</div>;
    }
    if (Array.isArray(data)) {
      const list = data.map((child, index) => (
        <li key={index}>
          {child.url ? (
            <a rel="noopener noreferrer" target="_blank" href={child.url}>
              {child.text}
            </a>
          ) : (
            child.text
          )}
          {child.children && Array.isArray(child.children)
            ? getSectionContent(
                child.children,
                child.childrenListType,
                level + 1
              )
            : ""}
        </li>
      ));
      return (
        <ol className={`ol_${listType} ol_${listType}_${level}`}>{list}</ol>
      );
    }
    return <div />;
  };
  return (
    <div key={`${stateAb}_Container`} className="stateSectionContainer">
      <div className="perfection__state">{states[stateAb]}</div>
      {(stateFee || documents) && (
        <div className="perfection__card-container">
          <Card>
            <div className="card-title">Requirements</div>
            <div>
              {stateFee && (
                <div>
                  <h3>State Fees</h3>
                  <div className="state-fee">{getSectionContent(stateFee)}</div>
                </div>
              )}
              {documents && (
                <div>
                  <h3>Documments</h3>
                  <div className="documents">
                    {getSectionContent(documents, "INDEX_1")}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
      {sectionsToBeCompleted && (
        <div className="perfection__card-container">
          <Card>
            <div className="card-title">
              Sections to be completed on the Title App
            </div>
            <div className="section-to-be-completed">
              {getSectionContent(sectionsToBeCompleted)}
            </div>
          </Card>
        </div>
      )}
      {dmvAddress && (
        <div className="perfection__card-container">
          <Card>
            <div className="card-title">DMV Address</div>
            <div className="dmv-address">{getSectionContent(dmvAddress)}</div>
          </Card>
        </div>
      )}
    </div>
  );
}
