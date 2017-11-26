import Certification from "./Certification";
import Question from "./Question";
import IAssociativeArray from "../domain/IAssociativeArray";

export interface AssessmentProps {
  sessionId: string;
  certification: Certification;
  // Can be converted to a map afterwards, but we have to use arrays here, as maps are not serializable
  // Parse to Map with new Map(array) and convert to array with spread operator like [...mapObject]
  answers: IAssociativeArray<Array<string>>;
}

export default class AssessmentSession {
  sessionId: string;
  certification: Certification;
  // Key = Question Id, Values = IDs of answers that were checked
  answers: IAssociativeArray<Array<string>>;

  constructor(props: AssessmentProps)
  {
    this.sessionId = props.sessionId;
    this.certification = props.certification;
    this.answers = props.answers;
  }
}