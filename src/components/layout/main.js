export default function Main() {
    const token = sessionStorage.getItem("token");

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            {/* <!--begin::Container--> */}
            <div className="container" id="kt_content_container">
                {/* <!--begin::Row--> */}
                <div className="row g-5 gx-xxl-8 mb-xxl-3">
                    {/* <!--begin::Col--> */}
                    <div className="col-xxl-4">
                        {/* <!--begin::Engage Widget 1--> */}
                        <div className="card card-xxl-stretch">
                            {/* <!--begin::Card body--> */}
                            <div className="card-body d-flex flex-column justify-content-between h-550px">
                                {/* <!--begin::Section--> */}
                                <div className="pt-12">
                                    {/* <!--begin::Title--> */}
                                    <h3 className="text-dark text-center fs-1 fw-boldest line-height-lg">공지사항</h3>
                                    {/* <!--end::Title--> */}
                                    {/* <!--begin::Text--> */}
                                    <div className="text-center text-gray-600 fs-5 fw-bold pt-4">
                                        <table id="kt_datatable_example_2"
                                            className="table table-striped table-row-bordered gy-5 gs-7">
                                            <thead>
                                                <tr className="fw-bold fs-6 text-gray-800">
                                                    <th>제목</th>
                                                    <th>작성일</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr each="b:${pagingNotify}">
                                                    <td><a
                                                        href="@{/board/notifyedit(num=${b.num })}"
                                                        text="${b.title }"></a><span
                                                            className="badge badge-pro badge-light-danger fw-bold fs-9 px-2 py-1 ms-1">중 요!</span>
                                                    </td>
                                                    <td text="${b.wdate }" ></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <!--end::Text--> */}
                                    {/* <!--begin::Action--> */}
                                    <div className="text-center py-7 mb-18">
                                        <a href="/board/notify" className="btn btn-primary fs-6 px-6"
                                            data-bs-target="#kt_modal_create_app">전체 공지사항</a>
                                    </div>
                                    {/* <!--end::Action--> */}
                                </div>
                                {/* <!--end::Section--> */}
                            </div>
                            {/* <!--end::Card body--> */}
                        </div>
                        {/* <!--end::Engage Widget 1--> */}
                    </div>
                    {/* <!--end::Col--> */}
                    {/* <!--begin::Col--> */}
                    <div className="col-xxl-8">
                        {/* <!--begin::Chart Widget 1--> */}
                        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                            {/* <!--begin::Card header--> */}
                            <div className="card-header border-0 pt-5">
                                {/* <!--begin::Card title--> */}
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-boldest fs-3 text-dark">이달의 우수직원</span>
                                    <span className="text-gray-400 mt-2 fw-bold fs-6">Employee of the Month</span>
                                </h3>
                                {/* <!--end::Card title--> */}
                                <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">
                                    <div if="${#authentication.principal.isMaster == 1}"
                                        className="btn btn-icon btn-active-light-primary w-60px h-60px w-md-60px h-md-60px align-self-center btn-person-plus-fill"
                                        data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                        data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                        <i className="bi bi-person-plus-fill">선택하기</i>
                                    </div>
                                    <div className="menu menu-sub menu-sub-dropdown menu-column w-400px w-lg-450px e_box"
                                        data-kt-menu="true">
                                        <form action="/member/monthMember"
                                            method="POST">
                                            <input type="hidden"
                                                name="${_csrf.parameterName}"
                                                value="${_csrf.token}" />
                                            <div className="card mb-5 mb-xl-10">
                                                <div className="card-header cursor-pointer">
                                                    <div className="card-title m-0">
                                                        <h3 className="fw-bolder m-0">임직원 목록</h3>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary align-self-center">선택
                                                    </button>
                                                </div>
                                                <div className="card-body p-9">
                                                    <div className="row mb-7">
                                                        <div className="col-lg-12 fv-row">
                                                            <span className="fw-bold fs-6">
                                                                <div className="input-group input-group-sm mb-3">
                                                                    <div className="scroll-y me-n5 pe-5 h-550px h-lg-auto"
                                                                        data-kt-scroll="true"
                                                                        data-kt-scroll-activate="{default: false, lg: true}"
                                                                        data-kt-scroll-max-height="auto"
                                                                        data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
                                                                        data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
                                                                        data-kt-scroll-offset="5px">
                                                                        <table className="table table-striped table-row-bordered gy-5 gs-7"
                                                                        // style="table-layout: auto; width: 100%;"
                                                                        >
                                                                            <tr className="fw-bold fs-6 text-gray-800"
                                                                            // style="text-align: center"
                                                                            >
                                                                                <th >이름</th>
                                                                                <th >사번</th>
                                                                                <th >부서</th>
                                                                                <th >직급</th>
                                                                                <th ><i
                                                                                    className="bi bi-check-square-fill"></i></th>
                                                                            </tr>
                                                                            <tr each="e : ${list}"
                                                                            // style="text-align: center"
                                                                            >
                                                                                <td ><span
                                                                                    className="name" text="${e.name}"></span></td>
                                                                                <td ><span
                                                                                    className="newNo"
                                                                                    text="${e.newNo}"></span></td>
                                                                                <td ><span
                                                                                    className="deptName"
                                                                                    text="${e.deptName}"></span></td>
                                                                                <td ><span
                                                                                    className="companyRankName"
                                                                                    text="${e.companyRankName}"></span></td>
                                                                                <td
                                                                                // style="width: 20%;"
                                                                                >
                                                                                    <input type="checkbox"
                                                                                        name="selectedMembers"
                                                                                        value="${e.id}"
                                                                                        checked="${e.monthMember == 1}"
                                                                                        onclick="limitSelections(this, 8)" /></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* <!--end::Header--> */}
                            <div className="card-body p-0">
                                {/* <!--begin::Tab content--> */}
                                <div className="tab-content pt-10">
                                    {/* <!--begin::Tab pane--> */}
                                    <div className="tab-pane fade active show" id="kt_chart_widget_1_tab_pane_1">
                                        {/* <!--begin::Row--> */}
                                        <div className="row p-0 px-9">
                                            {/* <!--begin::Col--> */}
                                            <div className="col-3" each="e, stat : ${monthMemlist}">
                                                {/* <!--begin::Stat--> */}
                                                <div className="border border-dashed border-gray-300 text-center min-w-75px rounded pb-4 my-3">
                                                    <img src="@{'profile/' + ${e.originFname}}" className="card-img-top"
                                                        if="${e.monthMember == 1 and e.originFname != null}" />
                                                    <img src="/img/default.png" className="card-img-top"
                                                        if="${e.monthMember == 1 and e.originFname == null}" />
                                                    <span className="fs-5 fw-bold text-gray-400 d-block"
                                                        if="${e.monthMember == 1}">
                                                        {/* [[${e.deptName}]] */}
                                                    </span>
                                                    <span className="fs-2 fw-boldest text-gray-800"
                                                        if="${e.monthMember == 1}">
                                                        {/* [[${e.name}]] */}
                                                    </span>
                                                </div>
                                                {/* <!--end::Stat--> */}
                                            </div>
                                            {/* <!--end::Col--> */}
                                        </div>
                                        {/* <!--end::Row--> */}
                                    </div>
                                    {/* <!--end::Tab pane--> */}
                                </div>
                                {/* <!--end::Tab content--> */}
                            </div>
                            {/* <!--end::Card body--> */}
                        </div>
                        {/* <!--end::Chart Widget 1--> */}
                    </div>
                    {/* <!--end::Col--> */}
                </div>
                {/* <!--end::Row--> */}
                <div className="row g-5 gx-xxl-8 mb-xxl-3">
                    {/* <!--begin::Col--> */}
                    <div className="col-xxl-12">
                        {/* <!--begin::Engage Widget 1--> */}
                        <div className="card card-xxl-stretch">
                            {/* <!--begin::Card body--> */}
                            <div className="card-body d-flex flex-column justify-content-between h-150px">
                                {/* <!--begin::Section--> */}
                                <div className="pt-4">
                                    {/* <!--begin::Title--> */}
                                    <h3 className="text-dark text-lg-start fs-1 fw-boldest mb-7">한 줄 명언</h3>
                                    <span id="quote" className="quote-container fw-bold fs-3 text-gray-800">
                                    </span><span id="quoteContent" className="quote-content fw-bold fs-3 text-gray-800"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--end::Container--> */}
        </div>

    );
}