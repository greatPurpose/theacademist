import React,{Component} from 'react';
import Slider from "react-slick";
import TextTruncate from 'react-text-truncate';

var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 2,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
            centerPadding: '0px',
            //centerMode: true,
            arrows: false
          }
        }
      ]
  };

class SliderComponent extends Component{
    render(){
        const {posts} = this.props;
        return(
            <Slider {...settings}>
            {posts.rows.map((post, id)=>
                <div className="column">
                  <a href={
                    `/blog/${post.id}/${post.urlParam}`
                  }><img src={post.featuredImage} />
                  <TextTruncate
                        line={2}
                        containerClassName="image-text"
                        element="div"
                        truncateText="…"
                        text={post.topic}
                        /></a>
                </div>
           )}
          </Slider>
        )
    }
}

export default SliderComponent;