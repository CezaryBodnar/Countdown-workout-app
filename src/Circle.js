import React from 'react';

export const SVGCircleWork = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#2b80ad"
            strokeWidth="12"
            d={describeArc(105, 105, 88, 0, radius)}
        />
    </svg>
);

export const SVGCircleRest = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#f54248"
            strokeWidth="12"
            d={describeArc(105, 105, 88, 0, radius)}
        />
    </svg>
);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}