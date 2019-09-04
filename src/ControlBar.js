import * as React from "react";
import Counter from "./Counter";

class ControlBar extends React.PureComponent {
  static MIN_ZOOM = 0;
  static MAX_ZOOM = 5;

  static defaultProps = {
    zoom: 0,
    invertX: false,
    invertY: false,
    onInvertX: () => undefined,
    onInvertY: () => undefined,
    onZoomChange: () => undefined
  };

  onZoomChange = zoom => {
    const { onZoomChange } = this.props;
    const { MIN_ZOOM, MAX_ZOOM } = ControlBar;
    const value = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));

    if (onZoomChange.apply) {
      onZoomChange(value);
    }
  };

  render() {
    const { zoom, invertX, invertY, onInvertX, onInvertY } = this.props;

    return (
      <div>
        <div>
          Zoom:
          <Counter value={zoom} onChange={this.onZoomChange} />
        </div>
        <div>
          <label>
            Invert X:
            <input
              type="checkbox"
              checked={invertX}
              onChange={() => onInvertX(!invertX)}
            />
          </label>
        </div>
        <div>
          <label>
            Invert Y:
            <input
              type="checkbox"
              checked={invertY}
              onChange={() => onInvertY(!invertY)}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default ControlBar;
