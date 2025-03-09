

export const handleLogout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("user_id")
    localStorage.removeItem("refresh")
    localStorage.removeItem("access")
}