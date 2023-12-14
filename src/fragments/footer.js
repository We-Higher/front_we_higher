import React from 'react';

const footer = () => {
    return (
        <nav id="footer">
            <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                    <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
                        <div className="container-fluid d-flex flex-column flex-md-row flex-stack">
                            <div className="text-dark order-2 order-md-1">
                                <span className="text-gray-400 fw-bold me-1">Created by</span>
                                <a href="/main" className="text-muted text-hover-primary fw-bold me-2 fs-6">
                                    Jung KwangBae, Cho HongMin, Cha SungWook, Kim HyeonJu
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </nav>
    );
};

export default footer;