import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/store";
import { createWrapper } from "next-redux-wrapper";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../configs/theme";
import Head from "next/head";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          href="../../static/assets/libs/sweetalert2/sweetalert2.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/libs/datatables/dataTables.bootstrap4.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/libs/datatables/responsive.bootstrap4.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/libs/datatables/buttons.bootstrap4.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/libs/datatables/select.bootstrap4.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/libs/bootstrap-tagsinput/bootstrap-tagsinput.css"
          rel="stylesheet"
        />
        <link
          href="../../static/assets/libs/multiselect/multi-select.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/css/bootstrap.min.css"
          id="bootstrap-stylesheet"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/css/icons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/css/app.min.css"
          id="app-stylesheet"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="../../static/assets/css/app.css"
          id="app-stylesheet"
          rel="stylesheet"
          type="text/css"
        />
        <script src="../../static/assets/js/vendor.min.js"></script>
        <script src="../../static/assets/libs/sweetalert2/sweetalert2.min.js"></script>

        <link
          rel="icon"
          type="image/png"
          href="../../static/assets/images/muna_logo.png"
        />
        <link
          rel="shortcut icon"
          href="../../static/assets/images/muna_logo.png"
        />

        <script src="../../static/assets/js/pages/sweet-alerts.init.js"></script>
        <script src="../../static/assets/libs/datatables/jquery.dataTables.min.js"></script>
        <script src="../../static/assets/libs/datatables/dataTables.bootstrap4.js"></script>
        <script src="../../static/assets/libs/datatables/dataTables.responsive.min.js"></script>
        <script src="../../static/assets/libs/datatables/responsive.bootstrap4.min.js"></script>
        <script src="../../static/assets/libs/datatables/dataTables.buttons.min.js"></script>
        <script src="../../static/assets/libs/datatables/buttons.bootstrap4.min.js"></script>
        <script src="../../static/assets/libs/datatables/buttons.html5.min.js"></script>
        <script src="../../static/assets/libs/datatables/buttons.flash.min.js"></script>
        <script src="../../static/assets/libs/datatables/buttons.print.min.js"></script>
        <script src="../../static/assets/libs/datatables/dataTables.keyTable.min.js"></script>
        <script src="../../static/assets/libs/datatables/dataTables.select.min.js"></script>
        <script src="../../static/assets/libs/pdfmake/pdfmake.min.js"></script>
        <script src="../../static/assets/libs/pdfmake/vfs_fonts.js"></script>
        <script src="../../static/assets/libs/jquery-knob/jquery.knob.min.js"></script>
        {/* <script src="../static/assets/libs/morris-js/morris.min.js"></script> */}
        {/* <script src="../static/assets/js/pages/dashboard.init.js"></script> */}
        <script src="../../static/assets/libs/raphael/raphael.min.js"></script>

        <script src="../../static/assets/libs/bootstrap-tagsinput/bootstrap-tagsinput.min.js"></script>
        <script src="../../static/assets/libs/multiselect/jquery.multi-select.js"></script>
        <script src="../../static/assets/libs/select2/select2.min.js"></script>
        <script src="../../static/assets/libs/multiselect/jquery.multi-select.js"></script>
        <script src="../../static/assets/libs/raphael/raphael.min.js"></script>
        <script src="../../static/assets/libs/katex/katex.min.js"></script>
        <script src="../../static/assets/js/app.js"></script>
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return { pageProps: pageProps };
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
