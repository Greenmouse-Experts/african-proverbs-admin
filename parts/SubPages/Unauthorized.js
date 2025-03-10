import React from 'react';
import Link from '@material-ui/core/Link';

const Unauthorized = ({children}) => {
    return (
        <div class="authentication-bg">
            <div class="account-pages mt-5 mb-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-8 col-lg-6 col-xl-5">
                            <div class="text-center">
                                <a href="/dashboard" class="logo">
                                    <img src="../../../static/assets/images/muna_logo.png" alt="" height="22" class="logo-light mx-auto"/>
                                {/* <img src="assets/images/logo-dark.png" alt="" height="22" class="logo-dark mx-auto"> */}
                                </a>
                                {/* <p class="text-muted mt-2 mb-4">Muna</p> */}
                            </div>
                            <div class="card">

                                <div class="card-body p-4">

                                    <div class="text-center">
                                        {children}
                                        <p class="text-muted mb-3">It's looking like you may have taken a wrong turn. Don't worry... it happens to
                                                the best of us. You might want to check your internet connection. Here's a little tip that might
                                                help you get back on track.</p>
                                            <Link href="/dashboard">  
                                                <a class="btn btn-danger waves-effect waves-light">
                                                    <i class="fas fa-home mr-1"></i> Back to Home
                                                </a>
                                            </Link>
                                        {/* <a href="index.html" class="btn btn-danger waves-effect waves-light"><i class="fas fa-home mr-1"></i> Back to Home</a> */}
                                    </div>
        

                                </div> 
                            </div>

                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;
