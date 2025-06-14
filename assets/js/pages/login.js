
  document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const fakeUser = {
      email: "user@test.vn",
      password: "123456"
    };

    if (email === fakeUser.email && password === fakeUser.password) {
      alert("Đăng nhập thành công!");
      window.location.href = "./index.html";
    } else {
      alert("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
  });
