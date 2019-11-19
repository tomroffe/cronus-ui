import React, { Component } from 'react';
import withRoot from './withRoot';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid,
         Typography, 
         FormControl } from '@material-ui/core';
import { AppBar, Toolbar } from "@material-ui/core";
import Select from 'react-select';

import Graph from './Graph'
import Pie from './Pie'

const styles = theme => ({
  graph: {
    margin: 0,
  },
  pie: {
    margin: 0,
  },

  formControl: {
    margin: theme.spacing.unit * 0.5,
  },
  selectfield: {
    width: 300,
    margin: theme.spacing.unit * 0.25,
  },
  title: {
    marginTop: 32
  }
});

class Cronus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorCategory: null,
      errorDepartment: null,
      isLoadedDepartment: false,
      isLoadedCategory: false,
      isLoadedPieData: false,
      selectedDepartment: "",
      selectedCategory: "",
      departments: [],
      categories: [],
      url: "",
      data: [],
      pie_data: []
    };
  }

  handleCategoryChange = (selectedCategory, actionMeta) => {
    if (actionMeta.action === 'clear') {
      this.setState({
        selectedCategory: "",
        isLoadedCategory: false,
      })
      this.getPaymentsByDepartment(this.state.selectedDepartment)
    } else {
      console.log(`selectedCategory: `, selectedCategory.value);
      this.setState({ selectedCategory });
      var res = encodeURI(this.state.url + "paymentsByDepartmentCategory/" 
                                        + this.state.selectedDepartment.value
                                        + "/"
                                        + selectedCategory.value);
          fetch(res)
              .then(res => res.json())
              .then(
              (result) => {
                  this.getCategorySums(this.state.selectedDepartment.value, selectedCategory.value)
                  this.setState({
                  isLoadedCategory: true,
                  data: result
                  });
              },
              (error) => {
                  this.setState({
                  isLoadedCategory: true,
                  error
                  });
              }
              )
    }
  }

  handleDepartmentChange = (selectedDepartment, actionMeta) => {
    console.log(`actionMeta:`, actionMeta.action);
    if (actionMeta.action === 'clear') {
      this.setState({
        selectedDepartment: "",
        selectedCategory: "",
        isLoadedCategory: false,
        categories: [],
        pie_data: [],
        data: []
      })
    } else {
      console.log(`selectedDepartment: `, selectedDepartment.value);
      this.setState({ selectedDepartment });
      this.setState({
        selectedCategory: "",
        categories: [],

      })
      var res = encodeURI(this.state.url + "paymentsByDepartment/" + selectedDepartment.value);
          fetch(res)
              .then(res => res.json())
              .then(
              (result) => {
                  this.getCategories(selectedDepartment.value)
                  this.getDepartmentCategorySums(selectedDepartment.value)
                  this.setState({
                  isLoadedDepartment: true,
                  data: result
                  });
              },
              (error) => {
                  this.setState({
                  isLoadedDepartment: true,
                  error
                  });
              }
              )
    }
  }

  componentDidMount() {
    var res = encodeURI(this.state.url + "departments/");
    console.group('Fetching departments');
    fetch(res)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(`Result:`, result);
          this.setState({
            isLoadedDepartment: true,
            departments: result
          });
        },
        (error) => {
          console.log(`Error:`, error);
          this.setState({
            isLoadedDepartment: false,
            error
          });
        }
      )
    console.groupEnd()
  }

  getPaymentsByDepartment(department) {
    console.group('Fetching Payments by Department : ' + department.value);
    var res = encodeURI(this.state.url + "paymentsByDepartment/" + department.value + "/");
    fetch(res)
        .then(res => res.json())
        .then(
        (result) => {
            this.getCategories(department.value)
            this.getDepartmentCategorySums(department.value)
            this.setState({
            isLoadedDepartment: true,
            data: result
            });
        },
        (error) => {
            this.setState({
            isLoadedDepartment: true,
            error
            });
        }
      )
    console.groupEnd()
  }

  getCategories(department) {
    var res = encodeURI(this.state.url + "departmentCategories/" + department);
    console.group('Fetching Categories for Department : ' + department);
    fetch(res)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(`Result:`, result);
          this.setState({
            isLoadedCategory: true,
            categories: result
          });
        },
        (error) => {
          console.log(`Error:`, error);
          this.setState({
            isLoadedCategory: false,
            error
          });
        }
      )
    console.groupEnd()
  }

  getDepartmentCategorySums(department) {
    var res = encodeURI(this.state.url + "departmentCategorySums/" + department);
    console.group('Fetching departmentCategorySums: ' + department);
    fetch(res)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(`Result:`, result);
          this.setState({
            isLoadedPieData: true,
            pie_data: result
          });
        },
        (error) => {
          console.log(`Error:`, error);
          this.setState({
            isLoadedPieData: false,
            error
          });
        }
      )
    console.groupEnd()
  }

  getCategorySums(department, category) {
    var res = encodeURI(this.state.url + "amountsByDepartmentCategory/" + department + "/" + category + "/");
    console.group('Fetching categorySums: ' + department + " : " + category);
    fetch(res)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(`Result:`, result);
          this.setState({
            isLoadedPieData: true,
            pie_data: result
          });
        },
        (error) => {
          console.log(`Error:`, error);
          this.setState({
            isLoadedPieData: false,
            error
          });
        }
      )
    console.groupEnd()
  }
  

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} alignItems={'center'} justify={'center'}>
          <Grid item xs={12}>
            <Grid container spacing={16} alignItems={'center'} direction={'column'} justify={'center'}>
              <Grid item className={classes.title} xs={12}>
                <Typography variant={'h5'} align={'center'}>
                  How the <strong>Royal Borough of Greenwich</strong> spends our money
                </Typography>
              </Grid>
              <Grid >
                <Grid container spacing={16} alignItems={'center'} direction={'row'} justify={'center'}>
                
                  <Grid item className={classes.select} xs={12} lg={6} align={'center'}>
                    <Typography variant="subtitle1">Department</Typography>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <Select isClearable className={classes.selectfield} value={this.state.selectedDepartment} onChange={this.handleDepartmentChange} options={this.state.departments} />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.select} xs={12} lg={6} align={'center'}>
                    <Typography variant="subtitle1">Category</Typography>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <Select isClearable className={classes.selectfield} value={this.state.selectedCategory} onChange={this.handleCategoryChange} options={this.state.categories} />
                    </FormControl>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div style={{ height: 500}}>
              <Pie data={this.state.pie_data} />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div style={{ height: 500}}>
              <Graph fontSize={16} group={this.state.selectedOption} data={this.state.data}/>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}


Cronus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Cronus));