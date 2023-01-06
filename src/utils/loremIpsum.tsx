import React, { Component } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text } from "react-native";

const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus gravida orci, non bibendum leo volutpat non. Morbi blandit, neque sed venenatis venenatis, magna augue blandit urna, at scelerisque mauris libero eu eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean libero velit, volutpat nec enim vel, facilisis commodo lectus. Donec sit amet turpis vel felis semper molestie non nec dolor. Maecenas luctus aliquet arcu et dapibus. Quisque quis odio purus. Nunc sagittis at lacus non dignissim. Vivamus imperdiet erat vitae diam porta, a vehicula leo blandit. Ut feugiat nunc mauris, et facilisis dolor sodales a. Quisque enim magna, pharetra ut varius vel, volutpat a ante. Mauris dignissim vestibulum ornare. Aenean hendrerit est quis laoreet interdum. Praesent maximus semper lobortis. Sed nibh libero, dictum vel dolor vitae, sagittis fermentum leo. Phasellus nec dapibus quam.

Proin semper mauris sit amet enim pharetra rhoncus. Etiam convallis venenatis augue, eu malesuada urna egestas non. Maecenas sit amet sem at mi pharetra volutpat sit amet auctor urna. Donec pretium dui eros, eu tristique sem sodales ut. Nunc ac feugiat ipsum, at porttitor urna. Ut nisi nunc, dictum eget tincidunt a, malesuada vitae risus. Fusce vehicula ultrices mollis.

Sed eget tortor tellus. Proin felis dolor, interdum nec ante non, ullamcorper viverra urna. Phasellus sed sem arcu. Cras laoreet tellus vel lorem mattis imperdiet. Mauris sagittis sapien leo, ac rutrum libero sodales non. Mauris sodales lobortis blandit. Ut ante risus, euismod vel elit ut, malesuada imperdiet tellus. Cras velit urna, accumsan ac elit a, sagittis elementum mauris. Quisque vel cursus nisl, ac sodales justo. Suspendisse purus arcu, rhoncus ac enim commodo, vulputate blandit dolor. Sed et tincidunt orci. Duis vestibulum lacus at eros pulvinar semper.

Pellentesque finibus blandit urna at maximus. Morbi lacinia tempus dui, vel mollis velit. Mauris convallis eros in nulla pellentesque, quis viverra nunc ullamcorper. Phasellus malesuada urna ut nibh condimentum, vel vestibulum urna sagittis. Maecenas leo risus, venenatis nec eros sit amet, auctor porta risus. Integer quis nulla mauris. Mauris ullamcorper metus sit amet maximus egestas. Donec quis lacus ut sem rhoncus commodo at ut sem. Ut pulvinar vel ex et posuere. Fusce quis lectus convallis, tristique elit ac, finibus orci. Vivamus sit amet mi ut nisl dictum suscipit. Suspendisse consectetur ultrices quam eget condimentum. Donec volutpat mauris vitae justo finibus aliquet. Suspendisse convallis dictum faucibus.

Vivamus id interdum purus, rutrum rutrum magna. Mauris venenatis dui id tellus dictum, in rhoncus turpis volutpat. Etiam nec enim gravida nulla commodo sollicitudin. Suspendisse et lectus sapien. Morbi viverra blandit ultrices. Sed nec sem sed lectus imperdiet dignissim. Phasellus eget pulvinar metus, in consectetur felis. Aenean semper ipsum ante, a suscipit metus pulvinar vitae. In rutrum, purus non imperdiet vulputate, ante tortor condimentum ligula, non tempus mauris tortor ut felis. Fusce venenatis, purus vitae ornare molestie, turpis leo aliquet mi, eget sodales nunc mi quis arcu. Aenean elit justo, volutpat vitae euismod eu, euismod luctus quam. Nulla consectetur quam a arcu laoreet, at imperdiet dui laoreet. Maecenas et ligula tristique, varius ligula convallis, congue lectus. 
`;
const styles = StyleSheet.create({
	lorem: { padding: 8 },
});

interface Props {
	words: number;
	style: StyleProp<ViewStyle>;
}

export class LoremIpsum extends Component<Props> {
	static defaultProps = {
		words: 1000,
		style: styles.lorem,
	};
	loremIpsum() {
		return LOREM_IPSUM.split(" ").slice(0, this.props.words).join(" ");
	}
	render() {
		return <Text style={this.props.style}>{this.loremIpsum()}</Text>;
	}
}
