import React, { Component } from "react";
import styled from "./CustomButton.module.css";

const slider = React.createRef();
const container = React.createRef();

let isTouchDevice = false
export default class CustomButton extends Component {
    state = {};


    componentDidMount() {
        isTouchDevice = "ontouchstart" in document.documentElement;

        if (isTouchDevice) {
            document.addEventListener("touchmove", this.onDrag);
            document.addEventListener("touchend", this.stopDrag);
        } else {
            document.addEventListener("mousemove", this.onDrag);
            document.addEventListener("mouseup", this.stopDrag);
        }
        this.containerWidth = container.current.clientWidth - 50;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.refresh && this.state.unlocked)
            this.reset()
    }

    onDrag = (e) => {
       

        if (this.isDragging) {
            if (isTouchDevice) {
                this.sliderLeft = Math.min(
                  Math.max(0, e.touches[0].clientX - this.startX),
                  this.containerWidth
                );
            } else {
                this.sliderLeft = Math.min(
                  Math.max(0, e.clientX - this.startX),
                  this.containerWidth
                );
            }
            this.updateSliderStyle();
        }
    };

    updateSliderStyle = () => {
        if (this.unmounted || this.state.unlocked) return;
        slider.current.style.left = this.sliderLeft + 50 + "px";
    };

    stopDrag = () => {
        
        if (this.isDragging) {
            this.isDragging = false;
            if (this.sliderLeft > this.containerWidth * 0.9) {
                this.sliderLeft = this.containerWidth;
                if (this.props.onSuccess) {
                    this.props.onSuccess();
                    this.onSuccess();
                }
            } else {
                this.sliderLeft = 0;
                if (this.props.onFailure) {
                    this.props.onFailure();
                }
            }
            this.updateSliderStyle();
        }
    };

    startDrag = (e) => {
        
        this.isDragging = true;
        if (isTouchDevice) {
            this.startX = e.touches[0].clientX;
        } else {
            this.startX = e.clientX;
        }
    };

    onSuccess = () => {
        
        this.setState({
            unlocked: true
        });
    };

    getText = () => {
        return this.state.unlocked
          ? this.props.text_unlocked || "Done"
          : this.props.text || "Swipe to process payment";
    };

    reset = () => {
        if (this.unmounted) return;
        this.setState({ unlocked: false }, () => {
            this.sliderLeft = 0;
            this.updateSliderStyle();
        });
    };

    componentWillUnmount() {
        this.unmounted = true;
    }

    render() {
        return (
          <div className={styled.ReactSwipeButton}>
              <div
                className={
                  styled.rsbContainer + " " +
                  (this.state.unlocked ? styled.rsbContainerUnlocked : "")
                }
                ref={container}
              >
                  <div
                    className={styled.rsbcSlider}
                    ref={slider}
                    onMouseDown={this.startDrag}
                    style={{ background: this.props.color }}
                    onTouchStart={this.startDrag}
                  >
                      <span className={styled.rsbcSliderText}>{this.getText()}</span>
                      <span className={styled.rsbcSliderArrow} style={{ right: 16 }}></span>
                      <span className={styled.rsbcSliderArrow} style={{ right: 22 }}></span>
                      <span className={styled.rsbcSliderArrow} style={{ right: 28 }}></span>
                      <span
                        className={styled.rsbcSliderCircle}
                        style={{ background: this.props.color }}
                      ></span>
                  </div>
                  <div className={styled.rsbcText}>{this.getText()}</div>
              </div>
          </div>
        );
    }
}
