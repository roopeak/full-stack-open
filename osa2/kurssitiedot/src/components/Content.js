import Part from './Part'

const Content = ({ content}) => {
    return(
        <div>
            <Part parts={content.parts} />
        </div>
    )
}

export default Content