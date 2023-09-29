import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { PickerContainer, SeparatorColumn } from './styled';

class PickerColumn extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    itemHeight: PropTypes.number.isRequired,
    columnHeight: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    align: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isMouseDown: false,
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      ...this.computeTranslate(props)
    };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isMoving) {
      return;
    }
    this.setState(this.computeTranslate(nextProps));
  }

  computeTranslate = (props) => {
    const {options, value, itemHeight, columnHeight} = props;
    let selectedIndex = options.indexOf(value);
    if (selectedIndex < 0) {
      // throw new ReferenceError();
      console.warn('Warning: "' + this.props.name+ '" doesn\'t contain an option of "' + value + '".');
      this.onValueSelected(options[0]);
      selectedIndex = 0;
    }
    return {
      scrollerTranslate: columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate: columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2
    };
  };

  onValueSelected = (newValue) => {
    this.props.onChange(this.props.name, newValue);
  };

  handleTouchStart = (event) => {
    if (this.props.disabled)
      return;
    const startTouchY = event.targetTouches[0].pageY;
    this.setState(({scrollerTranslate}) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate
    }));
  };

  safePreventDefault = (event) =>{
    const passiveEvents = ['onTouchStart', 'onTouchMove', 'onWheel', 'onMouseDown', 'onMouseMove'];
    if(!passiveEvents.includes(event._reactName)) {
      event.preventDefault();
    }
  }

  handleTouchMove = (event) => {
    if (this.props.disabled)
      return;
    this.safePreventDefault(event);
    const touchY = event.targetTouches[0].pageY;
    this.setState(({isMoving, startTouchY, startScrollerTranslate, minTranslate, maxTranslate}) => {
      if (!isMoving) {
        return {
          isMoving: true
        }
      }

      let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;
      if (nextScrollerTranslate < minTranslate) {
        nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
      } else if (nextScrollerTranslate > maxTranslate) {
        nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
      }
      return {
        scrollerTranslate: nextScrollerTranslate
      };
    });
  };

  handleTouchEnd = (event) => {
    if (this.props.disabled)
      return;
    if (!this.state.isMoving) {
      return;
    }
    this.setState({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0
    });
    setTimeout(() => {
      const {options, itemHeight} = this.props;
      const {scrollerTranslate, minTranslate, maxTranslate} = this.state;
      let activeIndex;
      if (scrollerTranslate > maxTranslate) {
        activeIndex = 0;
      } else if (scrollerTranslate < minTranslate) {
        activeIndex = options.length - 1;
      } else {
        activeIndex = - Math.floor((scrollerTranslate - maxTranslate) / itemHeight);
      }
      this.onValueSelected(options[activeIndex]);
    }, 0);
  };

  handleTouchCancel = (event) => {
    if (this.props.disabled)
      return;
    if (!this.state.isMoving) {
      return;
    }
    this.setState((startScrollerTranslate) => ({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: startScrollerTranslate
    }));
  };

  handleMouseDown = (event) => {
    if (this.props.disabled)
      return;
    if (event.target !== this.ref.current && !this.ref.current.contains(event.target))
      return;
      
    const startTouchY = event.pageY;
    this.setState(({scrollerTranslate}) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate,
      isMouseDown: true
    }));
  };
  
  handleMouseMove = (event) => {
    if (this.props.disabled)
      return;
    this.safePreventDefault(event);
    const touchY = event.pageY;
    
    if (!this.state.isMouseDown)
      return;

    this.setState(({isMoving, startTouchY, startScrollerTranslate, minTranslate, maxTranslate}) => {
      if (!isMoving) {
        return {
          isMoving: true
        }
      }

      let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;
      if (nextScrollerTranslate < minTranslate) {
        nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
      } else if (nextScrollerTranslate > maxTranslate) {
        nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
      }
      return {
        scrollerTranslate: nextScrollerTranslate
      };
    });
  };

  handleMouseUp = (event) => {
    if (this.props.disabled)
      return;
    if (!this.state.isMoving && !this.state.isMouseDown) {
      return;
    }
    this.setState({
      isMouseDown: false,
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0
    });
    setTimeout(() => {
      const {options, itemHeight} = this.props;
      const {scrollerTranslate, minTranslate, maxTranslate} = this.state;
      let activeIndex;
      if (scrollerTranslate > maxTranslate) {
        activeIndex = 0;
      } else if (scrollerTranslate < minTranslate) {
        activeIndex = options.length - 1;
      } else {
        activeIndex = - Math.floor((scrollerTranslate - maxTranslate) / itemHeight);
      }
      this.onValueSelected(options[activeIndex]);
    }, 0);
  };

  handleItemClick = (option) => {
    if (option !== this.props.value) {
      this.onValueSelected(option);
    } else {
      this.props.onClick(this.props.name, this.props.value);
    }
  };

  renderItems() {
    const {options, itemHeight, value, align, disabled} = this.props;
    return options.map((option, index) => {
      const style = {
        height: itemHeight + 'px',
        lineHeight: itemHeight + 'px',
        textAlign: align
      };
      const className = `picker-item${option === value ? ' picker-item-selected' : ''}${disabled === true ? ' disabled' : ''}`;
      return (
        <div
          key={index}
          className={className}
          style={style}
          // onClick={() => this.handleItemClick(option)}
        >
          {option}
        </div>
      );
    });
  }

  render() {
    const translateString = `translate3d(0, ${this.state.scrollerTranslate}px, 0)`;
    const style = {
      MsTransform: translateString,
      MozTransform: translateString,
      OTransform: translateString,
      WebkitTransform: translateString,
      transform: translateString
    };
    if (this.state.isMoving) {
      style.transitionDuration = '0ms';
    }
    return(
      <div className="picker-column" ref={this.ref}>
        <div
          className="picker-scroller"
          style={style}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
        >
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default class Picker extends Component {
  static propTyps = {
    optionGroups: PropTypes.object.isRequired,
    valueGroups: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    itemHeight: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.number,
    separator: PropTypes.string,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    onClick: () => {},
    itemHeight: 36,
    height: 216
  };

  renderInner() {
    const {optionGroups, valueGroups, itemHeight, height, onChange, onClick, separator, disabled} = this.props;
    const highlightStyle = {
      height: itemHeight,
      marginTop: -(itemHeight / 2)
    };
    const columnNodes = [];
    const separatorGroup = [];
    const itemCount = Math.ceil(height / itemHeight);
    for (let i = 0; i < itemCount; i ++) {
      separatorGroup.push('/');
    }
    let index = 0;
    let propertyCount = Object.keys(optionGroups).length;
    for (let name in optionGroups) {
      let align = 'center';
      if (propertyCount > 1) {
        if (index == 0) {
          align = 'left';
        }
        if (index == propertyCount - 1) {
          align= 'right';
        }
      }

      if (index) {
        columnNodes.push(
          <SeparatorColumn key={`separator${name}`} itemHeight={itemHeight} middleNo={Math.ceil(itemCount / 2)} disabled={disabled}>
            {separatorGroup.map((v, index) => {
              return <div className="separator" key={index}>{separator}</div>
            })}
          </SeparatorColumn>
        );
      }

      columnNodes.push(
        <PickerColumn
          key={name}
          name={name}
          options={optionGroups[name]}
          value={valueGroups[name]}
          itemHeight={itemHeight}
          columnHeight={height}
          onChange={onChange}
          onClick={onClick}
          align={align}
          disabled={disabled}
        />
      );
      index ++;
    }
    return (
      <div className="picker-inner">
        {columnNodes}
        <div className="picker-highlight" style={highlightStyle}></div>
      </div>
    );
  }

  render() {
    const style = {
      height: this.props.height,
      width: this.props.width,
      padding: this.props.padding
    };

    return (
      <PickerContainer height={style.height} width={style.width} padding={style.padding}>
        {this.renderInner()}
      </PickerContainer>
    );
  }
}