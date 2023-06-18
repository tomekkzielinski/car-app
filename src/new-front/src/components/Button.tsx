

export default function Button({text, onClick}: {text: string, onClick?: () => void} ) {
    return <button onClick={onClick} className="btn btn-primary">{text}</button>
    
}