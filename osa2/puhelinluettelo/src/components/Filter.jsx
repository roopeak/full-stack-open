const Filter = (props) => {
    const newFilter = props.newFilter
    const addFilter = props.addFilter
    
    return (
        <div>
            filter shown with
            <input
            value={newFilter}
            onChange={addFilter}
            />
        </div>
    )
}

export default Filter