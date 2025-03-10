import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../../store/actions/categoryAction";
import Card from "../../../components/UIElements/Card";
import { convTime } from "../../../utils/utilities";
import { makeStyles } from "@material-ui/core/styles";

const Category = ({ proverb, user }) => {
  const { categories, isLoadingcategories } = useSelector(
    (state) => state.Categories
  );
  const { isLoading } = useSelector((state) => state.proverb);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categories == null) {
      dispatch(fetchCategories());
    }
  }, []);

  return (
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-md-4">
            <Card
              title={`Suggested Categories`}
              body={
                categories && categories.length > 0
                  ? (
                      categories.find(
                        (category) => category.id === proverb.category_id
                      ) || {}
                    ).name || "No categories found"
                  : "No categories found"
              }
              time={`Created: ${convTime(proverb.date_created)}`}
            ></Card>
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
}));

export default Category;
