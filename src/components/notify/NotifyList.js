export default function NotifyList() {
    return (
        <div className="main-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-danger">
                                <h2 className="card-title ">공지사항</h2>
                                <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">
                                    <div if="${#authentication.principal.isMaster == 1}" className="btn btn-icon btn-active-light-primary w-60px h-60px w-md-60px h-md-60px align-self-center" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                        <i className="bi bi-person-plus-fill">글 작성</i>
                                    </div>
                                    <div className="menu menu-sub menu-sub-dropdown menu-column w-400px w-lg-500px e_box" data-kt-menu="true">
                                        <form action="/board/notifyadd" method="POST" onsubmit="return notifysubmit();">
                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                                            <div className="card mb-5 mb-xl-10">
                                                <div className="card-header cursor-pointer">
                                                    <div className="card-title m-0">
                                                        <h3 className="fw-bolder m-0">공지사항 작성</h3>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary align-self-center">작 성
                                                    </button>
                                                </div>
                                                <div className="card-body p-9">
                                                    <div className="row mb-7">
                                                        <label className="col-lg-4 fw-bold text-muted">작성자 (Writer)</label>
                                                        <div className="col-lg-8">
                                                            <span className="fw-bolder fs-6 text-dark">
                                                                <div className="input-group input-group-sm mb-3">
                                                                    [[${'{'}#authentication.principal.name{'}'}]]
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-7">
                                                        <label className="col-lg-4 fw-bold text-muted">작성일 (Date)</label>
                                                        <div className="col-lg-8">
                                                            <span className="fw-bolder fs-6 text-dark">
                                                                <div className="input-group input-group-sm mb-3">
                                                                    [[${'{'}date{'}'}]]
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-7">
                                                        <label className="col-lg-4 fw-bold text-muted">제 목 (Title)</label>
                                                        <div className="col-lg-8">
                                                            <span className="fw-bolder fs-6 text-dark">
                                                                <div className="input-group input-group-sm mb-3">
                                                                    <input type="text" name="title" className="form-control" />
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-7">
                                                        <label className="col-lg-4 fw-bold text-muted">내 용 (Content)</label>
                                                        <div className="col-lg-8">
                                                            <span className="fw-bolder fs-6 text-dark">
                                                                <div className="input-group input-group-sm mb-3">
                                                                    <textarea rows={10} cols={30} name="content" className="form-control" defaultValue={""} />
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <form action="/board/searchNotify" method="GET">
                                    <div className="input-group mb-3" style={{ paddingTop: '50px' }}>
                                        <div className="input-group-prepend">
                                            <select name="type" className="form-select form-select-sm">
                                                <option value="none">전체</option>
                                                <option value="name">이름</option>
                                                <option value="title">제목</option>
                                            </select>
                                        </div>
                                        <input type="text" name="option" className="form-control form-control-sm" placeholder="검색어를 입력하세요" />
                                        <div className="input-group-append">
                                            <button type="submit" name="search" className="btn btn-success btn-sm" style={{ zIndex: 0 }}>
                                                검색
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="kt_datatable_example_2" className="table table-striped table-row-bordered gy-5 gs-7">
                                        <thead>
                                            <tr className="fw-bold fs-6 text-gray-800">
                                                <th>글번호</th>
                                                <th>이름</th>
                                                <th>제목</th>
                                                <th>작성일</th>
                                                <th>조회수</th>
                                                <th if="${#authentication.principal.isMaster == 1}">수정</th>
                                                <th if="${#authentication.principal.isMaster == 1}">삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr each="b, loop:${paging}">
                                                <td text="${paging.getTotalElements - (paging.number * paging.size) - loop.index}" />
                                                <td text="${b.member.name }" />
                                                <td><a href="@{/board/notifyedit(num=${b.num })}" text="${b.title }" /><span className="badge badge-pro badge-light-danger fw-bold fs-9 px-2 py-1 ms-1">중 요!</span>
                                                </td>
                                                <td text="${b.wdate }" />
                                                <td text="${b.cnt }" />
                                                {/*수정*/}
                                                <td if="${#authentication.principal.isMaster == 1}" style={{ padding: '2px' }}>
                                                    <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px  align-self-center" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                        <i className="bi bi-pencil" />
                                                    </div>
                                                    <div className="menu menu-sub menu-sub-dropdown menu-column w-400px w-lg-500px e_box" data-kt-menu="true">
                                                        <form action="/board/notifyedit" method="POST" encType="multipart/form-data">
                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                                                            <div className="card mb-5 mb-xl-10">
                                                                <div className="card-header cursor-pointer">
                                                                    <div className="card-title m-0">
                                                                        <h3 className="fw-bolder m-0">글 수정</h3>
                                                                    </div>
                                                                    <button type="submit" className="btn btn-primary align-self-center">수정
                                                                    </button>
                                                                </div>
                                                                <input type="hidden" name="num" value="${b.num}" />
                                                                <input type="hidden" className="form-control" name="writer" value="${b.member.name}" />
                                                                <input type="hidden" className="form-control" name="wdate" value="${b.wdate}" />
                                                                <div className="card-body p-9">
                                                                    <div className="row mb-7">
                                                                        <label className="col-lg-4 fw-bold text-muted">작성자
                                                                            (Writer)</label>
                                                                        <div className="col-lg-8">
                                                                            <span className="fw-bolder fs-6 text-dark">
                                                                                <div className="input-group input-group-sm mb-3">
                                                                                    [[${'{'}b.member.name{'}'}]]
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-7">
                                                                        <label className="col-lg-4 fw-bold text-muted">작성일
                                                                            (Date)</label>
                                                                        <div className="col-lg-8">
                                                                            <span className="fw-bolder fs-6 text-dark">
                                                                                <div className="input-group input-group-sm mb-3">
                                                                                    [[${'{'}b.wdate{'}'}]]
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-7">
                                                                        <label className="col-lg-4 fw-bold text-muted">제 목
                                                                            (Title)</label>
                                                                        <div className="col-lg-8">
                                                                            <span className="fw-bolder fs-6 text-dark">
                                                                                <div className="input-group input-group-sm mb-3">
                                                                                    <input type="text" id="title" rows={10} cols={30} name="title" className="form-control" value="${b.title }" />
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-7">
                                                                        <label className="col-lg-4 fw-bold text-muted">내 용
                                                                            (Content)</label>
                                                                        <div className="col-lg-8">
                                                                            <span className="fw-bolder fs-6 text-dark">
                                                                                <div className="input-group input-group-sm mb-3">
                                                                                    <textarea id="content" rows={10} cols={30} name="content" className="form-control" text="${b.content }" defaultValue={""} />
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </td>
                                                {/*삭제*/}
                                                <td if="${#authentication.principal.isMaster == 1}" style={{ padding: '2px' }}>
                                                    <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                        <a href="@{/board/notifydel(num=${b.num})}">
                                                            <i className="bi bi-trash-fill del" />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {/* 페이징처리 시작 */}
                                    <div if="${!paging.isEmpty()}">
                                        <ul className="pagination justify-content-center">
                                            {/* 처음 링크 */}
                                            <li className="page-item" classappend="${paging.first} ? 'disabled'">
                                                <a className="page-link" href="@{|?page=1&type=${type}&option=${option}|}">
                                                    <span>처음</span>
                                                </a>
                                            </li>
                                            {/* 이전 링크 */}
                                            <li className="page-item" classappend="${!paging.hasPrevious} ? 'disabled'">
                                                <a className="page-link" href="@{|?page=${paging.number}&type=${type}&option=${option}|}">
                                                    <span>이전</span>
                                                </a>
                                            </li>
                                            {/* 페이지 번호 */}
                                            <li each="page: ${#numbers.sequence(1, paging.totalPages)}" if="${page >= paging.number-4 and page <= paging.number+4}" classappend="${page == paging.number+1} ? 'active'" className="page-item">
                                                <a text="${page}" className="page-link" href="@{|?page=${page}&type=${type}&option=${option}|}" />
                                            </li>
                                            {/* 생략 기호 */}
                                            <li if="${paging.number+4 < paging.totalPages}" className="page-item disabled">
                                                <a className="page-link">...</a>
                                            </li>
                                            {/* 다음 기호 */}
                                            <li className="page-item" classappend="${!paging.hasNext} ? 'disabled'">
                                                <a className="page-link" href="@{|?page=${paging.number+2}&type=${type}&option=${option}|}">
                                                    <span>다음</span>
                                                </a>
                                            </li>
                                            {/* 마지막 링크 */}
                                            <li className="page-item" classappend="${paging.last} ? 'disabled'">
                                                <a className="page-link" href="@{|?page=${paging.totalPages}&type=${type}&option=${option}|}">
                                                    <span>마지막</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* 페이징처리 끝 */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}