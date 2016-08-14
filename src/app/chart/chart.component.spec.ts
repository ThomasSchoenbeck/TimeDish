/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ChartComponent } from './chart.component';

import { ElementRef } from '@angular/core';

describe('Component: Chart', () => {
  it('should create an instance', () => {

    let elementRef: ElementRef;

    let component = new ChartComponent(elementRef);
    expect(component).toBeTruthy();
  });
});
