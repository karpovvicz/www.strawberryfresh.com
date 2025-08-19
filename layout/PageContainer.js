export default function PageContainer({ children, className = "" }) {
    return (
        <div className={`max-w-4xl mx-auto px-4 ${className}`}>
            {children}
        </div>
    );
}