import React from 'react';
import Div from "../molecules/Div";
import Paragraph from "../atoms/Paragraph";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Table from "../molecules/Table";
import Label from "../molecules/Label";

function MainContent(props) {
  return (
    <Div className="main-section">
      <Paragraph
        className="instructions"
        text="Click on the 'Choose file' button to select a csv file."
      />
      <Label>
        <Input
          type="file"
          className="file"
          onChange={(e) => {
            props.handleFileUpload(e);
            props.showTable();
          }}
        />
      </Label>
      <Button className="btn-result" onClick={() => {props.pairResult(); props.showResult();}}>
        Calculate
      </Button>
      <Div>
        <Paragraph className="result" text={props.resultText}></Paragraph>
      </Div>
      <Table data={props.data} /> 
    </Div>
  );
}

export default MainContent;
