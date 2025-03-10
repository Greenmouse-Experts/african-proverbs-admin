import { useRouter } from "next/router";
import { BarChart} from 'react-chartkick'

const Loader = () => {
    return (
        <div className="loader">
            <Style/>
            <div class="spinner-grow text-center text-success" role="status">
                <span class="sr-only ">Loading...</span>
            </div>
            <p>loading...</p>
        </div>
    )
}

const Style = () => {
    return (
      <style jsx global>{`
        .loader{
          margin: auto;
          width: 60%;
          padding-left: 350px;     
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        `}
      </style>
    )
  }

export default Loader;