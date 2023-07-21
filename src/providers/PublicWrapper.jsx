export default ({ children }) => {
    return <div style={{
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 4px',

        backgroundImage: 'url(/bgimg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

    }}>
        {children}
    </div>
}