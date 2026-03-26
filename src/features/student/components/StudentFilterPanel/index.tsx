import './styles.css'

export default function StudentFilterPanel() {
    return (
        <>
            <div className="cp-filter-painel cp-mb20">

                <div className='cp-filter-painel-item'>
                    <label>Status:</label>
                    <select>
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>

                <div className='cp-filter-painel-item'>
                    <label>Sort by:</label>
                    <select>
                        <option>Name</option>
                        <option>Email</option>
                    </select>
                </div>



                <button>
                    Clear Filters
                </button>
            </div>
        </>
    )
}