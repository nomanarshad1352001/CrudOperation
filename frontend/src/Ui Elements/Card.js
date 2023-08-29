import './Card.css'

export default function Card(props) {
    const clasess = `card ${props.className}`;
    return (
        <div className={clasess}>{props.children}</div>
    )
}
