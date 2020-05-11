import dynamic from 'next/dynamic'

const SliderComponentWithNoSSR = dynamic(import('./Slider'), {
  ssr: false
})

export default () =>
  <div>
    <SliderComponentWithNoSSR />
  </div>