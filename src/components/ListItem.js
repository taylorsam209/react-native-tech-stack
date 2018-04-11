import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from "react-native";
import { CardSection } from "./common";
import { connect } from "react-redux";
import * as actions from "../actions";

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true)

class ListItem extends Component {

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {
        const {library, expanded} = this.props;
        if(expanded) {
            return (
                <CardSection>
                <Text style={styles.description}>
                {library.description}
                </Text>
                </CardSection>
            )
        }
    }
  render() {
    const { id, title } = this.props.library;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={styles.title}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  title: {
    fontSize: 18,
    paddingLeft: 15
  },
  description: {
    flex: 1,
    padding: 15
  }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;
    return {expanded};
};

export default connect(mapStateToProps, actions)(ListItem);
