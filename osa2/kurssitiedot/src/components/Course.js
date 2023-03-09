import Header from './Header'
import Part from './Part'
import Content from './Content'

const Course = ({ course }) => {
    // console.log(props)
    
    return (
        <div>
            <Header header={course.name} />
            <Content content={course} />
        </div>
    )
}

export default Course