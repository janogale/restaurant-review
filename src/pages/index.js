import React from 'react'
import {useRouter} from 'next/router'
import Layout from "../components/Layout";
import Login from "../components/login";

import { AppState } from 'src/context';

const Index = () => {
    const router = useRouter();
  const { state } = AppState();

  React.useEffect(() => {
    // if  logged in redirect to home page
    if (state?.isLoggedIn) {
      router.push("/home");
    }
  });

  return (
    <Layout>
      <Login />
    </Layout>
  )
};

export default Index;
