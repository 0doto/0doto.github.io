 $(document).ready(function () {
            let url = new URL(window.location.href);
            let params = url.searchParams;
            for (let pair of params.entries())
                if (pair[0] == "form") document.getElementById("form_span").innerHTML = tryDecrypt(decodeURIComponent(pair[1]));
                else window.location.href = "https://nportal.ntut.edu.tw/";
            if ($("form").get(0)) $("form").get(0).submit();
            else window.location.href = "https://nportal.ntut.edu.tw/";
            window.setTimeout(function () {
                if ($("form").get(0)) $("form").get(0).submit();
                else window.location.href = "https://nportal.ntut.edu.tw//";
            }, 1000);
        });

        function tryDecrypt(content) {
            var startTime = parseInt(new Date().getTime() / 10000) - 6;
            var iv = CryptoJS.enc.Base64.parse("QFRUQ0FBUFBU" + "VENBQVBQQA==");
            for (let i = startTime; i < startTime + 12; i++) {
                let result = decrypt("TTCA" + i.toString() + "APP", iv, content);
                if (result != "") return result;
            }
            return '';
        }
        function decrypt(key, iv, content) {
            try {
                var key = CryptoJS.enc.Utf8.parse(key);
                var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                var result = bytes.toString(CryptoJS.enc.Utf8);
                return atob(result);
            } catch (error) { }
            return '';
        }