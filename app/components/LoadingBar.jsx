import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from './Container'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { useLoadingBarContext } from '@app/store/loading-bar'
import { useEffect } from 'react'

const LoadingBar = () => {
  const { loadingBar } = useLoadingBarContext()

  useEffect(() => {
    console.log(loadingBar)
  }, [loadingBar])

  return (
    <div className="py-7 bg-hero-pattern shadow-lg">
      <Container>
        <div className="flex gap-4 ">
          <FontAwesomeIcon width={35} className="text-2xl" icon={faCarSide} />
          <div className="w-full relative">
            <div className="bottom-[50%] translate-y-[50%] w-full h-2.5 bg-gradient-light-gray rounded-full"></div>
            <div
              className={`top-[50%] translate-y-[-50%] h-2.5 bg-green-400 rounded-s-full`}
              style={{
                width: `${loadingBar.toString()}%`,
                transition: 'all 1s',
              }}
            ></div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LoadingBar
