import React from "react";

const SubMenu = ({ toggleMenu, name, children, status }) => {
  const iconToNameMap = {
    Proverbs: "mdi-domain",
    Faqs: "mdi-comment-question-outline",
    "Push Notifications": "mdi-signal-variant",
    Packages: "mdi-view-dashboard",
    AffiliatedLanguage: "mdi-nfc-tap",
    //"Ethnic Facts": "mdi-comment-question",
    Subscriptions: "mdi-signal",
    "Fact Questions": "mdi-help-rhombus-outline",
    "User Notifications": "mdi-jquery",
    Reports: "mdi-file-document",
    Flags: "mdi-flag-checkered",
    "Ethnic Symbols": "mdi-shape-plus",
  };

  return (
    <>
      <a href="javascript: void(0);" onClick={() => toggleMenu()}>
        <i class={`mdi ${iconToNameMap[name]}`}></i>
        <span> {name} </span>
        <span class="menu-arrow"></span>
      </a>

      {status ? children : null}
    </>
  );
};

export default SubMenu;
