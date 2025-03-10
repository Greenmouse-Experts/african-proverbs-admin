import Unauthorized from "@/parts/SubPages/Unauthorized";
import QuestionForm from "../../parts/forms/QuestionForm";
import { checkPermission } from "@/utils/utilities";
import withAuth from "@/utils/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const UpdateQuestion = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const { user } = useSelector((state) => state.auth);

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            {user &&
            checkPermission(user.roles, "Admin") |
              checkPermission(user.roles, "Author") |
              checkPermission(user.roles, "SuperAdmin") ? (
              <QuestionForm requestType="Update" record_id={id} />
            ) : (
              <Unauthorized />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    fontSize: 11,
  },
  container: {
    flexGrow: 1,
    position: "relative",
  },
  input: {
    width: "240px",
    height: "40px",
    width: "100%",
    padding: "10px 20px",
    fontFamily: "Helvetica, sans-serif",
    fontSize: "14px",
    border: "1px solid #ced4da",
    borderRadius: "0.2rem",
  },
  inputFocused: {
    outlineStyle: "none",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    boxShadow: "0px 2px 2px 2px #E5E5E5",
  },
  suggestion: {
    display: "block",
    margin: 5,
    cursor: "pointer",
    padding: 7,
  },
}));

export default withAuth(UpdateQuestion);
