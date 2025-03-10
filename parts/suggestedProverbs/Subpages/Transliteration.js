import React from "react";
import Card from "../../../components/UIElements/Card";
import { makeStyles } from "@material-ui/core/styles";
import { convTime, checkPermission } from "../../../utils/utilities";

const Transliteration = ({ proverb, languages, user }) => {
  return (
    <>
      <div class="row">
        <div class="col-lg-12">
          {user &&
          checkPermission(user.roles, "Author") |
            checkPermission(user.roles, "Admin") |
            checkPermission(user.roles, "SuperAdmin") ? (
            <div class="col-lg-3 mt-2 mb-2">
              <div class="widget"></div>
            </div>
          ) : null}

          <div class="row">
            <div class="col-md-4">
              <Card
                title={`English Transliteration`}
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

export default Transliteration;
