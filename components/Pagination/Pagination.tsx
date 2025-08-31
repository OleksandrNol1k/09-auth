import css from "../Pagination/Pagination.module.css"
import ReactPaginate from "react-paginate"

interface PaginationProps {
    total: number;
    page: number;
    onChange: (nextPage: number) => void;
}

export default function Pagination({ total, page, onChange }: PaginationProps) {

    return (
        <ReactPaginate
            pageCount={total}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={({ selected }) => onChange(selected + 1)}
            forcePage={page - 1}
            renderOnZeroPageCount={null}
            containerClassName={css.pagination}
            activeClassName={css.active}
            breakLabel="..."
            nextLabel="→"
            previousLabel="←"
        />
    );
}