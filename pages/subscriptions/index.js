import React, { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import SubscriptionsTable from "@/parts/subscriptions/SubscriptionList";

const Subscriptions = () => {
 
  return <SubscriptionsTable />;
};

export default withAuth(Subscriptions);
