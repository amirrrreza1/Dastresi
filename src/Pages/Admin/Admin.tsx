import React, { useState } from "react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // مقایسه یوزر و پسورد با مقادیر از پیش تعیین شده (در اینجا فقط برای نمونه)
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("یوزر یا پسورد اشتباه است.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-[400px] h-[400px] bg-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center justify-around rounded-2xl">
        <h2>ورود به صفحه Admin</h2>
        <input
          type="text"
          placeholder="یوزر"
          value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white"
        />
        <input
          type="password"
          placeholder="پسورد"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="leading-8">ورود</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>خوش آمدید به صفحه Admin</h1>
      {/* محتوای صفحه Admin اینجا می‌آید */}
    </div>
  );
};

export default Admin;
