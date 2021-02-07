21.02.04 (리액트 useEffect 에서의 비동기 관련 문제)

* 문제 코드
    ```js
    //...
    useEffect(() => {
        getMovies();
        setisLoading(false);
    },[]);

    const getMovies = async () => {
        const movies = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
        setMoives(movies.data.data.movies);
    }

    return (
        <div>
        {isLoading ? "Now Loadings..." : movies.map(movie => (
            <Movie 
                key={movie.id}
                id={movie.id}
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                poster={movie.medium_cover_image}
            />
            )
        )}
        </div>
    );
    ```
    * 위에서 보면 getMovie() 함수는 비동기 함수이고, 그 안에서 api요청을 기다렸다가 값을 다 받아오면 setMovies()를 통해 state를 업데이트 해주고있다.
    * 이때 원래 의도대로라면 getMovies() 뒤에서 setisLoading(false) 를 통해 isLoading을 업데이트하여 "Now loading..." 을 보여주다가 API 요청이 모두 끝나고 받아온 것을 보여주려 했다.
    * 하지만 의도와는 다르게 값을 다 받아오기도 전에 setisLoading(false) 가 실행되어 중간에 아무것도 없는 화면이 보여지게 되었다. 
    * 이에 대해 고민해본 결과 문제는 비동기 처리에 있다고 생각했다.
    * getMovies 함수 내부에서만 비동기로 처리가 되고있었던 것이다. 
    * 그 결과 useEffect 내에서는 getMovies 를 실행시키고 결과를 보지 않은채 바로 setisLoading(false)를 실행하여 중간에 아무것도 없는 화면이 보여지게 된 것이다.
    * 왜냐하면 isLoading은 false인데 movies 업데이트 되지 않아 빈 배열이기 떄문에 빈 화면이 보여지는 것이다.
    * 해결은 아래와 같이 해결을 하였다. 비동기 동기 처리에 대해 자세히 고민할 필요가 있다. 

* 해결 코드
    ```javascript
    //...
    useEffect(() => {
        getMovies();
    },[]);

    const getMovies = async () => {
        const movies = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
        setMoives(movies.data.data.movies);
        setisLoading(false);
    }

    return (
        <div>
        {isLoading ? "Now Loadings..." : movies.map(movie => (
            <Movie 
                key={movie.id}
                id={movie.id}
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                poster={movie.medium_cover_image}
            />
            )
        )}
        </div>
    );
    ```
