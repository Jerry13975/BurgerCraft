
const Footer = () => {
    const currentYear =new Date().getFullYear();

    return (
        <footer className="footer">
            <p>&copy;{currentYear} Jerry | <a href="mailto:liujerry647@gmail.com">Contact Me</a> | <a href="https://www.linkedin.com/in/jerryliu2981" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </footer>
    )
}

export default Footer