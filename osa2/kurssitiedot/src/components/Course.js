import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {   
    return (
        <div>
            <Header header={course.name} />
            <Content content={course} />
            <Total exercises={course} />
        </div>
    )
}

export default Course