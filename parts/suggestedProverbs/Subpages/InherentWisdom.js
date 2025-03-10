import React from "react";
import Card from "../../../components/UIElements/Card";
import { makeStyles } from "@material-ui/core/styles";
import { convTime } from "../../../utils/utilities";

const InherentWisdom = ({ proverb }) => {
  return (
    <>
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-md-4">
              <Card
                title={`English  Interpretation`}
                body={proverb.content}
                time={`Created: ${convTime(proverb.date_created)}`}
              ></Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: 11,
  },
}));

export default InherentWisdom;
