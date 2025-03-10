import { deleteFaqsFromBackend, fetchFaqs } from "@/store/actions/faqActions";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import Alert from "../UIElements/Alert";
import { checkPermission, formatDate } from "../../utils/utilities";
import FaqTableData from "./FaqTableData";

const header = [
  { id: "s/n", title: "S/N" },
  {
    id: "Question",
    title: "Question",
  },
  {
    id: "Answer",
    title: "Answer",
  },
  {
    id: "Created At",
    title: "Created At",
  },
  {
    id: "Modified At",
    title: "Modified At",
  },
  {
    id: "Status",
    title: "Status",
  },
  {
    id: "Action",
    title: "Action",
  },
];

const FAQTableNew = () => {
  const dispatch = useDispatch();
  const { msg } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { faqs } = useSelector((state) => state.faqs);
  console.log(faqs, "from here");

  useEffect(() => {
    dispatch(fetchFaqs());
  }, []);

  //delete popup logic
  const handleDeleteItem = (faqId) => {
    dispatch(deleteFaqsFromBackend(faqId));
  };

  return (
    <div class="content mt-2">
      <>
        {msg ? <Alert payload={msg} /> : null}
        <div className="row mx-auto">
          <div className="row mx-auto col-lg-12">
            <FaqTableData tableHeader={header} title="Manage Faqs">
              {faqs &&
                faqs.map((value, index) => {
                  return (
                    <tr key={value}>
                      <td>{index + 1}</td>
                      <td>{value.question}</td>
                      <td>{value.answer}</td>
                      <td>{formatDate(value.date_created)}</td>
                      <td>{formatDate(value.date_modified)}</td>
                      <td>{value.faqStatus}</td>
                      <td>
                        <ul class="list-inline mb-0">
                          {user &&
                          user.roles &&
                          checkPermission(user.roles, "Author") |
                            checkPermission(user.roles, "Admin") |
                            checkPermission(user.roles, "SuperAdmin") ? (
                            <>
                              <li class="list-inline-item">
                                <span
                                  class="icon circle-icon "
                                  data-tip
                                  data-for="edit"
                                >
                                  <Link href={`/update-faq/${value.id}`}>
                                    <i class="mdi mdi-circle-edit-outline  text-primary"></i>
                                  </Link>
                                </span>
                                <ReactTooltip
                                  id="edit"
                                  place="top"
                                  effect="solid"
                                >
                                  Edit Faq
                                </ReactTooltip>
                              </li>
                              <li
                                class="list-inline-item"
                                style={{ position: "relative" }}
                              >
                                <span
                                  onClick={() => handleDeleteItem(value.id)}
                                  class="icon circle-icon"
                                  data-tip
                                  data-for="delete"
                                >
                                  <i class="mdi mdi-delete text-danger"></i>
                                </span>
                                <ReactTooltip
                                  id="delete"
                                  place="top"
                                  effect="solid"
                                >
                                  Delete Faq
                                </ReactTooltip>
                              </li>
                            </>
                          ) : null}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
            </FaqTableData>
          </div>
        </div>
      </>
    </div>
  );
};

export default FAQTableNew;
