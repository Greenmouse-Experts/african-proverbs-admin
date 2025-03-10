import Unauthorized from "@/parts/SubPages/Unauthorized";
import ProverbForm from "@/parts/forms/ProverbForm";
import { toggleIsLoading } from "@/store/actions/authActions";
import { fetchCategories } from "@/store/actions/categoryAction";
import { fetchEthnic } from "@/store/actions/ethnicAction";
import { addProverb, clearLikelihood } from "@/store/actions/proverbActions";
import { checkPermission, retrieveCategoryArray } from "@/utils/utilities";
import withAuth from "@/utils/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateProverb = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { result } = useSelector((state) => state.proverb);
  const [actionType, setActionType] = useState("");
  const dispatch = useDispatch();
  const { ethnics } = useSelector((state) => state.Ethnics);
  const { categories } = useSelector((state) => state.Categories);
  const { isLoading } = useSelector((state) => state.proverb);
  const { user, msg } = useSelector((state) => state.auth);
  const [state, setstate] = useState({ country: "", region: "" });
  const [hidden, setHidden] = useState(true);

  const selectCountry = (val) => {
    setstate({ ...state, country: val });
  };

  useEffect(() => {
    if (!ethnics) {
      dispatch(fetchEthnic());
    }
    if (!categories) {
      dispatch(fetchCategories());
    }
    if (isLoading) {
      dispatch(toggleIsLoading());
    }
  }, []);

  const initialOption = [
    { label: "Choose a category", value: " ", disabled: true },
  ];

  const getSuggestions = (value) => {
    const inputValue = value && value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : proverbs &&
          proverbs.filter((proverb) => {
            const keep =
              count < 5 &&
              proverb.content.toLowerCase().slice(0, inputLength) ===
                inputValue;

            if (keep) {
              count += 1;
            }

            return keep;
          });
  };

  const getSuggestionValue = (suggestion) => suggestion.content;

  const renderSuggestion = (suggestion) => <div>{suggestion.content}</div>;

  const onChange = (event, { newValue }) => {
    console.log(event.target.value);

    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    console.log(value);
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const { handleSubmit, control, reset, register, errors } = useForm();

  const onSubmit = (data) => {
    // if(value === ''){
    //     console.log('dispatching this')
    //     dispatch( setAlert('Proverb Content Cannot be empty', 'ERROR'))
    //     return
    // }
    const { ethnic, category, proverb, origin } = data;
    const payload = {
      // content : value,
      content: proverb,
      categories: retrieveCategoryArray(category),
      ethnic: ethnic,
      status: actionType == "save" ? "CREATED" : "AWAITING",
      hidden: hidden,
    };

    if (actionType == "saveanyway") {
      payload["approved"] = true;
      console.log(payload);
      dispatch(addProverb(payload));
      dispatch(clearLikelihood());
      reset();
      setValue("");
      return;
    }
    if (origin) {
      payload["origin"] = origin;
    }
    // console.log(payload);
    dispatch(addProverb(payload));
  };

  const inputProps = {
    placeholder: "Start writing your proverb",
    value,
    onChange: onChange,
  };

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            {user &&
            checkPermission(user.roles, "Admin") |
              checkPermission(user.roles, "Author") |
              checkPermission(user.roles, "SuperAdmin") ? (
              <ProverbForm requestType="Create" />
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

export default withAuth(CreateProverb);
