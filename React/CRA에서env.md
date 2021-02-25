# Create-React-App 에서의 env

## env를 사용하는 이유

 * 개발을 하는 과정에서 API_KEY나, db 관련 정보 등 중요한 정보는 github나 오픈소스에 올리면 안된다.
 * 이때 환경변수 파일을 외부에 만들어 소스코드 내에서 중요한 정보를 직접 입력해서 사용하는 것이 아닌 외부에서 가져오도록 하여 보안을 높인다.
 * env 파일을 작성했다면 반드시 .gitignore 파일에서 해당 파일이 commit 되지 않도록 해주자
 * 하지만 JSX를 React.js로 빌드하고 다시 이것을 javascript 코드로 변경하는 과정에서 실제 값들이 들어가게 된다.
 * 그 결과 이것을 다운받아서 사용하는 사람들은 해당 정보들을 알 수 있다.
 * 이 부분에 대해서는 다른 추가적인 보안작업이 필요하다.
 * 다만 이를통해 github나 오픈소스에 이러한 코드를 대놓고 공개하지 않을 수 있다.

## env 파일 작성하기

 * 프로젝트 루트 폴더에 .env 파일을 작성한다.
 * 변수를 작성할때 반드시 ```REACT_APP_```을 붙여줘야 한다.
    * ex)

        > REACT_APP_API_KEY = alkjwneflkawjenflkwjenf <br/>
        REACT_APP_APP_ID = kjwefaljkhwebfkjawhebf
 * 각 키 값에 ```" "```를 붙이지 않고, 끝에 ```,``` 를 작성하지 않는다
 * 이를 통해 외부에서는 알면 안되는 값들을 지정해준다.

## 변수 사용하기

 * CRA를 통해 이미 설정이 되어있기 때문에 특별히 파일을 import할 필요는 없다.
 <br/>(CRA에서는 환경 별로 변수를 사용하기 위해 Dotenv모듈을 사용하고 있다)
 * 사용할때는 ```process.env.```을 붙이고 지정해준 변수명을 적어주면 된다.
    * ex) 

        > process.env.REACT_APP_API_KEY