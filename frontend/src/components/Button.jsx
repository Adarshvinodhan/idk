export default function Button({ className = '', children, onClick, type }) {
    return (
        <button className={`bg-red-500 text-white rounded-full px-2 py-1 ${className}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
}

