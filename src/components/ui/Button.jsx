export default function Button({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    className = '' 
    }) {
    const baseStyles = 'px-5 py-2.5 rounded-lg font-semibold tracking-wide transition-all duration-200 cursor-pointer text-sm shadow-xs active:scale-95 focus:outline-hidden focus:ring-2';
    
    const variants = {
        // Primary: Malacañang National High School Maroon
        primary: 'bg-sslg-maroon text-white hover:bg-sslg-maroon-hover focus:ring-sslg-maroon',
        // Secondary: Forest Green Shield Accent
        secondary: 'bg-sslg-green text-white hover:bg-sslg-green-hover focus:ring-sslg-green',
        // Outline: Crimson style outline
        outline: 'border-2 border-sslg-maroon text-sslg-maroon hover:bg-red-50 focus:ring-sslg-maroon',
        danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500'
    };

    return (
        <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        >
        {children}
        </button>
    );
    }