//  Import CSS.
import {
	InspectorControls, PanelColorSettings, RichText
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
	PanelBody,
	RangeControl,
	Panel, 
	PanelRow,
	SelectControl
} from '@wordpress/components';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
//import { useState } from '@wordpress/element';

/**
 * Register: aa Gutenberg Block.
 */
registerBlockType( 'wppx-price-table-block/block-wppx-price-table-block', {
	title: __( 'Price Table' ),
	description: __( 'Instantly create beautiful pricing table' ),
	icon: {
		src: 'editor-table',
	},
	category: 'wppx_block_list',
	keywords: [
		__( 'price' ),
		__( 'wppx' ),
		__( 'table' ),
	],

	supports: {
		align: [ 'left', 'right', 'center' ],
	},

	attributes: {
		heading: {
			type: 'string',
			default: 'Standard',
		},
		features: {
			type: 'string',
		},
		amount: {
			type: 'string',
			default: '$30',
		},
		signup: {
			type: 'string',
			default: 'sign up',
		},
		borderSize: {
			type: 'number',
			default: 4,
		},
		textColor: {
			type: 'string',
			default: '#F74197',
		},
		borderColor: {
			type: 'string',
			default: '#F74197',
		},
		buttonBgColor: {
			type: 'string',
			default: '#F74197',
		},
		buttonTextColor: {
			type: 'string',
			default: '#FFFFFF',
		},
		style: {
			type: 'string',
			default: 'style-1',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 */
	edit: ( props ) => {
		const { attributes: { heading, features, amount, signup, style }, setAttributes } = props;
		const colorSample = [
			{ color: '#F74197', name: 'Default' },
			{ color: '#F0F8FF', name: 'AliceBlue' },
			{ color: '#F0FFFF', name: 'Azure' },
			{ color: '#00FFFF', name: 'Aqua' },
			{ color: '#7FFFD4', name: 'Aquamarine' },
			{ color: '#F5F5DC', name: 'Beige' },
			{ color: '#0000FF', name: 'Blue' },
			{ color: '#8A2BE2', name: 'BlueViolet' },
			{ color: '#A52A2A', name: 'Brown' },
			{ color: '#A52A2A', name: 'Brown' },
			{ color: '#DA70D6', name: 'Orchid' },
			{ color: '#AFEEEE', name: 'PaleTurquoise' },
			{ color: '#191970', name: 'MidnightBlue' },
			{ color: '#000080', name: 'Navy' },
			{ color: '#FF00FF', name: 'Magenta' },
		];

		const textStyle = {
			color: props.attributes.textColor,
		};
		const borderStyle = {
			border: props.attributes.borderSize + 'px solid ' + props.attributes.borderColor,
		};
		const buttonBGStyle = {
			'background-color': props.attributes.buttonBgColor,
		};
		const buttonTextStyle = {
			color: props.attributes.buttonTextColor,
		};

		return ( [
			<InspectorControls>
				<PanelBody title="Select Style" initialOpen={ false }>
					<PanelRow>Select More Style</PanelRow>
					<SelectControl
						label="Size"
						value={ style }
						options={ [
							{ label: 'Style One', value: 'style-1' },
							{ label: 'Style Two', value: 'style-2' },
							{ label: 'Style Three', value: 'style-3' },
						] }
						onChange={ ( value ) => {setAttributes({
							style: value
						})}}
					/>
				</PanelBody>
				<PanelBody>
					<PanelColorSettings
						title={ __( 'Text Color' ) }
						colorValue={ props.attributes.textColor }
						colorSettings={ [ {
							value: props.attributes.textColor,
							colors: colorSample,
							label: __( 'Select Color' ),
							onChange: ( newTextColor ) => props.setAttributes( { textColor: newTextColor } ),
						} ] }
					/>
					<RangeControl
						label={ __( 'Border Size' ) }
						value={ props.attributes.borderSize }
						min={ 0 }
						max={ 20 }
						step={ 1 }
						onChange={ ( newBorderSize ) => props.setAttributes( { borderSize: newBorderSize } ) }
					/>
					<PanelColorSettings
						title={ __( 'Border Color' ) }
						colorValue={ props.attributes.borderColor }
						colorSettings={ [ {
							value: props.attributes.borderColor,
							colors: colorSample,
							label: __( 'Select Color' ),
							onChange: ( newBorderColor ) => props.setAttributes( { borderColor: newBorderColor } ),
						} ] }
					/>
					<PanelColorSettings
						title={ __( 'Button BG Color' ) }
						colorValue={ props.attributes.buttonBgColor }
						colorSettings={ [ {
							value: props.attributes.buttonBgColor,
							colors: colorSample,
							label: __( 'Select Color' ),
							onChange: ( newButtonColor ) => props.setAttributes( { buttonBgColor: newButtonColor } ),
						} ] }
					/>
					<PanelColorSettings
						title={ __( 'Button Text Color' ) }
						colorValue={ props.attributes.buttonTextColor }
						colorSettings={ [ {
							value: props.attributes.buttonTextColor,
							colors: colorSample,
							label: __( 'Select Color' ),
							onChange: ( newButtonTextColor ) => props.setAttributes( { buttonTextColor: newButtonTextColor } ),
						} ] }
					/>
				</PanelBody>
			</InspectorControls>,

			<div className='wrapper'>
				{style == 'style-1' && (
					<div className="wppx_pricetable" style={ textStyle }>
						<div className="wppx_pricetable__card">
							<div className="wppx_pricetable__card__header">
								<RichText
									tagName="h3"
									className="title"
									value={ heading }
									placeholder="Standard"
									onChange={ ( heading ) => setAttributes( { heading } ) }
								/>
							</div>
							<div className="wppx_pricetable__card__content" style={ borderStyle }>
								<RichText
									tagName="ul"
									multiline="li"
									value={ features }
									placeholder={ __( 'Enter plan features...' ) }
									onChange={ ( features ) => setAttributes( { features } ) }
								/>
								<div className="wppx_pricetable__card__content__value">
									<RichText
										tagName="span"
										className="amount"
										placeholder="$10"
										value={ amount }
										onChange={ ( amount ) => setAttributes( { amount } ) }
									/>
								</div>
							</div>
						</div>
						<div className="wppx_pricetable__signup" style={ buttonBGStyle }>
							<RichText
								tagName="span"
								placeholder="Sugn Up"
								value={ signup }
								onChange={ ( signup ) => setAttributes( { signup } ) }
								style={ buttonTextStyle }
							/>
						</div>
					</div>
				)}
				{style == 'style-2' && (
					<h1>Style 2</h1>
				)}
				{style == 'style-3' && (
					<h1>Style 3</h1>
				)}
				
			</div>,
		] );
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 */
	save: ( props ) => {
		const { attributes: { heading, features, amount, signup }, setAttributes } = props;

		const textStyle = {
			color: props.attributes.textColor,
		};
		const borderStyle = {
			border: props.attributes.borderSize + 'px solid ' + props.attributes.borderColor,
		};
		const buttonBGStyle = {
			'background-color': props.attributes.buttonBgColor,
		};
		const buttonTextStyle = {
			color: props.attributes.buttonTextColor,
		};

		return (
			<div className="wppx_pricetable" style={ textStyle }>
				<div className="wppx_pricetable__card">
					<div className="wppx_pricetable__card__header">
						<RichText.Content
							tagName="h3"
							className="title"
							value={ heading }
						/>
					</div>
					<div className="wppx_pricetable__card__content" style={ borderStyle }>

						<RichText.Content
							tagName="ul"
							multiline="li"
							value={ features }
						/>
						<div className="wppx_pricetable__card__content__value">
							<RichText.Content
								tagName="span"
								className="amount"
								value={ amount }
							/>
						</div>
					</div>
				</div>
				<div className="wppx_pricetable__signup" style={ buttonBGStyle }>
					<RichText.Content
						tagName="span"
						value={ signup }
						style={ buttonTextStyle }
					/>
				</div>
			</div>
		);
	},
} );
