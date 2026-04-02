import './styles.css'

type Props = {
    page: number;
    totalElements: number;
    pageSize: number;
    onChange: (page: number) => void;
};

export default function Pagination({ page, totalElements, pageSize, onChange }: Props) {

    const totalPages = Math.ceil(totalElements / pageSize);

    const start = totalElements === 0 ? 0 : (page-1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalElements);

    const changePage = (p: number) => {
        if(p<1) return;
        if(p>totalPages) return;
        onChange(p);
    }

    const getPages = () => {

        const pages: (number | "...")[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (page > 3) {
                pages.push("...");
            }

            for (let i = page - 1; i <= page + 1; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }

            if (page < totalPages - 2) {
                pages.push("...")
            }

            pages.push(totalPages);
        }
        return pages;
    };

    const pages = getPages();

    return (
        <>
            <div className="cp-pagination-container">

                <div className='cp-pagination-info'>
                    Showing {start} to {end} of {totalElements} entries
                </div>

                <div className='cp-pagination'>
                    <button disabled={page === 1} onClick={() => changePage(page - 1)}>
                        Previous
                    </button>

                    {
                        pages.map((p, i) => 
                            p === "..." ? (
                            <span key={i} className='dots'>...</span>
                        ) : (
                            <button key={p} className={p === page ? "cp-page-active" : ""} onClick={() => changePage(p)}>
                                {p}
                            </button>
                        ))
                    }

                    <button disabled={page === totalPages} onClick={() => changePage(page + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}