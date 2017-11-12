import * as React from "react";
import { Button, Panel, ButtonGroup } from "react-bootstrap";
import Question from "../model/Question";
import AnswerEditView from "./AnswerEditView";
import Answer from "../model/Answer";
import Text from "../model/Text";
import FieldGroup from "./FieldGroup";
import * as uuid from "uuid/v4";

export interface QuestionEditViewProps {
    question: Question;
    onQuestionChange: (question: Question) => void;
    requestDeletion: () => void;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export default class QuestionEditView extends React.PureComponent<QuestionEditViewProps, undefined> {
    constructor(props: QuestionEditViewProps) {
        super(props);

        this.onAnswerChange = this.onAnswerChange.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.onQuestionTextChange = this.onQuestionTextChange.bind(this);
        this.onQuestionKeyChange = this.onQuestionKeyChange.bind(this);
    }

    onAnswerChange(index: number, answer: Answer){
      let question = this.props.question;
      let answers = (question.answers || []).map((value, i) => i != index ? value : answer);
      let update = {...question, answers: answers};

      this.props.onQuestionChange(update);
    }

    onQuestionKeyChange (e: any) {
      let value = e.target.value;
      let question = this.props.question;

      let update = {...question, key: value};

      this.props.onQuestionChange(update);
    }

    onQuestionTextChange (e: any) {
      let value = e.target.value;
      let question = this.props.question;
      let update = {...question, text: new Text({value: value})};

      this.props.onQuestionChange(update);
    }

    addAnswer(){
      let question = this.props.question;
      let update = {...question, answers: (question.answers || []).concat(new Answer({id: uuid()}))};

      this.props.onQuestionChange(update);
    }

    deleteAnswer (index: number) {
      let question = this.props.question;
      let answers = (question.answers || []).filter((value, i) => i != index);
      let update = {...question, answers: answers};

      this.props.onQuestionChange(update);
    }

    render(){
        let content =
          <div key={this.props.question.id + "header"}>
            <FieldGroup
              id={this.props.question.id + "_qKey"}
              control={{type: "text", value:this.props.question.key, onChange: this.onQuestionKeyChange}}
              label="Key"
            />
            <FieldGroup
              id={this.props.question.id + "_qText"}
              control={{type: "text", value:this.props.question.text ? this.props.question.text.value : "", onChange: this.onQuestionTextChange}}
              label="Question"
            />
            <Button bsStyle="success" onClick={this.addAnswer}>Add Answer</Button>
            <ButtonGroup vertical block type="checkbox">
              {this.props.question.answers && (this.props.question.answers.map((a, index) =>
                {
                  return (<AnswerEditView key={a.id} onAnswerChange={(a: Answer) => this.onAnswerChange(index, a)} answer={a} requestDeletion={() => this.deleteAnswer(index)} />)
                }))}
            </ButtonGroup>
            <Button className="pull-right" bsStyle="danger" onClick={this.props.requestDeletion}>Delete Question</Button>
          </div>;

        return (
            <Panel>
                {content}
            </Panel>);
    }
}
